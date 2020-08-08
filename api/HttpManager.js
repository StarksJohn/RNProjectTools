/**
 * 网络请求
 */
import { Platform } from 'react-native'
import *as netwrokCode from './netwrokCode'
import tool from '../tools/tool'

export const CONTENT_TYPE_JSON = 'application/json'
export const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded'
const isIos = Platform.OS === 'ios'
export const optionParams = {
  timeoutMs: 10000,//超时时间 毫秒
  token: null,
  authorizationCode: null,//token
}

//构造函数
const HttpManager = function () {
  console.log('HttpManager construct ',)
  this.init()
}

HttpManager.prototype.init = async function () {
  console.log('HttpManager init ',)

  this.optionParams = optionParams

  /**
   * 格式化json请求参数
   */
  this.formParamsJson = (method, params, headers) => {
    const body = JSON.stringify(params)
    const req = {
      method: method,
      headers: new Headers({
        'Content-Type': CONTENT_TYPE_JSON,
        ...(headers || {})
      }),
      body
    }
    return req
  }

  /**
   * 格式化表单请求参数
   */
  this.formParams = (method, params, headers) => {
    const str = []
    for (let p in params) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]))
    }
    let body = null
    if (str.length > 0) {
      body = str.join('&')
    }
    const req = {
      method: method,
      headers: new Headers({
          'Content-Type': CONTENT_TYPE_FORM,
          ...(headers || {})
        }
      ),
      body
    }
    return req
  }

  /**
   * 超时管理
   */
  this.requestWithTimeout = (ms, promise, text) => {
    // console.log('requestWithTimeout base=', base)
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        resolve({
          status: netwrokCode.NETWORK_TIMEOUT,
          message: '网络超时'
        })
      }, ms)
      promise.then(
        (res) => {
          clearTimeout(timeoutId)
          if (text) {
            resolve(res.text())
          } else {
            resolve(res)
          }
        },
        (err) => {
          clearTimeout(timeoutId)
          resolve(err)
        }
      )
    })
  }

  /**
   * 发起网络请求
   * @param url 请求url
   * @param method 请求方式
   * @param params 请求参数
   * @param json 是否需要json格式的参数请求
   * @param header 外加头
   * @param text 是否text返回，默认false，json格式返回 ；base=true时 直接返回的是 字符串
   * @param timeoutMs 超时
   * @return {Promise.<*>}
   */
  this.netFetch = async ({ url, method = 'POST', params = {}, json = true, header = {}, text = false, timeoutMs = this.optionParams.timeoutMs, token, commonParams/*通用参数*/ = {} }) => {

    const headers = Object.assign({}, commonParams, header)

    let requestParams
    if (method === 'POST') {//post
      if (json) {
        requestParams = this.formParamsJson(method, params, headers)
        // commonParams && Object.keys(commonParams).map(
        //   (value, index, array) => {
        //     if (index === 0) {
        //       url += `?${value}=${commonParams[value]}`
        //     } else {
        //       url += `&${value}=${commonParams[value]}`
        //     }
        //   }
        // )
      } else {
        requestParams = this.formParams(method, params, headers)
      }
    } else {//get
      requestParams = this.formParams(method, params, headers)
      if (requestParams.body) {
        url += `?${requestParams.body}`
      }
      delete requestParams.body
    }

    // console.log('\n 请求url: ', url)
    // console.log('请求参数 params: ', params)
    // console.log('请求 header: ', requestParams)
    // console.log('请求参数 timeoutMs: ', timeoutMs)

    const [err, response] = await tool.to(this.requestWithTimeout(timeoutMs, fetch(url, requestParams), text))
    // console.log('url=', url, '  的返回参数 response= ', response)

    if (text) {//是否text返回,默认false
      console.log()
      return Promise.resolve({
        data: response,/*返回字符串时 不能 给data 赋值为对象，只能给data 赋值为 字符串， */
        code: 0
      })
    } else {
      if (err || response instanceof Error || response.status !== netwrokCode.SUCCESS) {
        console.log('HttpManager.js err=', err)
        console.log('HttpManager.js response=', response)

        if (response instanceof Error) {
          return Promise.reject(response)
        } else {
          return Promise.reject({ ...response, totalUrl: url, header: requestParams })
        }
      }
      const [err, responseJson] = await tool.to(response.json())//序列化返回值
      if (err || !responseJson) {
        console.log('HttpManager.js 序列化返回值失败 response=', response)
        return Promise.reject({ ...responseJson, totalUrl: url, header: requestParams })
      }
      // console.log('返回参数序列化后=: ', responseJson)
      if (response.status === 200) {//最终 接口成功
        return Promise.resolve({ ...responseJson, totalUrl: url, header: requestParams })
      }
    }
  }
}

const singleton = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new HttpManager()
    }
    return instance
  }
})

export default new singleton()()
