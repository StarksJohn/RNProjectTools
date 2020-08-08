// import RN组件 代码模板
import React from 'react'
import {
  Modal,
  Image,
} from 'react-native'
import { Toast } from 'teaset'
import Text from './base/BaseText/Text'
import { scaleSize } from '../style/ScreenUtils'
import imgSource from '../res/img/imgSource'

let loadingKey = null

/**
 * 全屏中间显示加载中菊花
 * @param style
 * @param text
 * @param duration
 * @param position
 */
export default {
  /**
   * 加载中菊花
   * @param icon
   * @param text
   */
  showLoading (p) {
    p = {
      ...{ icon: <Image style={{ width: scaleSize(50), height: scaleSize(50) }} source={imgSource.loading} />, text: '加载中...' },
      ...p,
    }
    const { icon, text } = p
    loadingKey = Toast.show({
      style: {
        borderRadius: scaleSize(10), paddingLeft: scaleSize(30),
        paddingRight: scaleSize(30),
        paddingTop: 0,
        paddingBottom: 0,
      },
      text: text,
      icon: icon,
      position: 'center',
      duration: 1000000, modal: true,
    })
  },

  hideLoading () {
    if (!loadingKey) return
    Toast.hide(loadingKey)
    loadingKey = null
  },
}
