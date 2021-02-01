// getFontFamily.js
import { Platform } from 'react-native'

/**
 * https://juejin.im/post/5ce66c26e51d4555fd20a2a0
 * （1）通过对 Text styles 的检测，拿到对应自定义字体
 （2）过滤掉 Text styles 中的 fontWeight fontStyle 得到新的 styles 对象
 */
// 声明项目中用到的所有字体配置。fontWeight参考 https://reactnative.cn/docs/text/
const fonts = {
  'PingFangSC-Regular': {
    fontWeight: '400',
  },
  'PingFangSC-Medium': {
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
  },
  'PingFangSC-Semibold': {
    fontWeight: Platform.OS === 'ios' ? '700' : '800',
  }
}

/**
 *
 * @param baseFontFamily 字体名
 * @param styles Text组件的style
 * @returns {string}
 */
  const getFontFamily = (baseFontFamily='PingFangSC-Regular', styles = {}) => {
  const { fontWeight } = styles
  let font = fonts[baseFontFamily]//通过字体名拿到fonts对应的字体属性
  if (!font) {
    font = fonts['PingFangSC-Regular']
    baseFontFamily = 'PingFangSC-Regular'
  }
  if (!fontWeight) {
    let fw = font.fontWeight
    styles.fontWeight = fw
  }
  return baseFontFamily
}

export default getFontFamily
