import { Platform } from 'react-native'

export default {
  /**
   * https://www.cnblogs.com/chrissong/p/10841760.html
   * 避免 try catch  后去 err
   * @param promise
   * @returns {*|Promise<T | any[]>}
   */
  to: (promise) => {
    return promise.then(res => {
      return [null, res]
    })
      .catch(err => {
        return [err]
      })
  },

  /**
   * 图片网络链接 ios补全 https，安卓可用http
   * @param imgUrl
   * @returns {*}
   */
  uri: (imgUrl='') => {
    if (Platform.OS === 'ios' && imgUrl.startsWith('http:')) {
      imgUrl = imgUrl.replace(/http/, 'https')
    }
    return imgUrl
  },

  //换算显示的 xxx 万
  tenThousandConversion: (n, unitStr/*超过10000后最后显示的单位*/) => {
    if (n >= 10000) {
      n = Math.round((n / 10000) * 100) / 100
      n = n + unitStr
    }
    return n
  }
}
