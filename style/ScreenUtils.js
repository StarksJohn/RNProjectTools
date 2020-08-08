/**
 * Created by zhuoy on 2017/6/27.
 * 屏幕工具类
 * ui设计基准,iphone 6
 *
 *  * https://github.com/lizhuoyuan/ReactNativeScreenUtil
 * https://blog.csdn.net/u011272795/article/details/73824558
 * width:750px
 * height:1334px
 */

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */

import {
  Dimensions,
  PixelRatio,
  Platform
} from 'react-native'

//https://juejin.im/post/5c4949bc6fb9a049bd42a6eb
// iPhone X、iPhone XS
const X_WIDTH = 375
const X_HEIGHT = 812
// iPhone XR、iPhone XS Max
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896
const DEVICE_SIZE = Dimensions.get('window')
const { height: D_HEIGHT, width: D_WIDTH } = DEVICE_SIZE
export const isiOS = () => Platform.OS === 'ios'
let _isIphoneX = (() => {
  let is = (
    isiOS() &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  )
  console.log('当前设备属于 刘海屏？', is)
  return is
})()

export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height
/**
 * ipx 之前的 非刘海屏都是 1：1.7x
 * 大佬非全面屏手机：1.68
 * 力宏非全面屏：1.6
 * ipx:1:2.1
 * xs:1:2.16
 * xsMax:同上
 * xr:同上
 * ip11:同上
 * ip11Pro:同上
 * ip11ProMax:同上
 * opppo Reno:同上
 * vivo全面屏:2.09
 * 向南全面屏：2.09
 * 小米9：1:1.9
 * @type {boolean}
 */
export const isLongScreen = deviceHeight / deviceWidth >= 1.8 //是否是长屏手机，全面屏基本都是 长屏手机，宽高比都在 1.8 以上

// (async () => {
//   let model = await DeviceInfo.getModel()
//   console.log('设备Model: ', model)/*坑：iPhone 11 && iPhone 11 Pro && iPhone 11 Pro Max 模拟器时 model=iPhone；   */
//   let DeviceName = await DeviceInfo.getDeviceName()
//   console.log('设备DeviceName: ', DeviceName)/*坑：iPhone X 模拟器时 DeviceName=张超’s MacBook Pro*/
//   return (DeviceName === 'iPhone X' || model === 'iPhone X' || DeviceName === 'iPhone Xʀ' || DeviceName === 'iPhone Xs' || DeviceName === 'iPhone Xs Max' || DeviceName === 'iPhone 11' || DeviceName === 'iPhone 11 Pro' || DeviceName === 'iPhone 11 Pro Max')
// })().then(
//   (r) => {
//     console.log('当前设备属于 刘海屏？', r)
//
//     _isIphoneX = r
//   }
// )

global.gScreenOrientation = 'PORTRAIT'// 屏幕当前状态   LANDSCAPE | PORTRAIT
global.LANDSCAPE = 'LANDSCAPE'// 横屏
global.PORTRAIT = 'PORTRAIT'

//6和6s 获取的 deviceWidth是 375，*2也就是 蓝湖的尺寸；其他设备获取的都不是 375
console.log('deviceWidth=', deviceWidth)
console.log('deviceHeight=', deviceHeight)
console.log('屏幕宽高比：', deviceHeight / deviceWidth)
// alert(`屏幕宽高比=${deviceHeight/deviceWidth}`)

let fontScale = PixelRatio.getFontScale() // 返回字体大小缩放比例
let pixelRatio = PixelRatio.get() // 当前设备的像素密度
console.log('当前设备的像素密度=', pixelRatio)

// 像素密度
export const DEFAULT_DENSITY = 2

const defaultPixel = 2 // iphone6的像素密度
// px转换成dp
// const w2 = 750 / defaultPixel;

// px转换成dp
// 以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 750 / DEFAULT_DENSITY
// px转换成dp
const h2 = 1334 / DEFAULT_DENSITY

export const scale = Math.min(deviceWidth / w2, deviceHeight / w2)// deviceWidth / w2;   //获取缩放比例,在 屏幕旋转时 必须 在 方法内 重新计算此值，故
// 不能静态写死

/**
 * 设置text为sp,但在安卓上显示的不对，故暂时放弃
 * @param size sp
 * return number dp
 */
export function scaleText (size) {
  // 考虑屏幕旋转问题，字体缩放每次都得计算 当前屏幕宽高
  // let w = Dimensions.get('window').width
  // let h = Dimensions.get('window').height
  //
  // let scaleWidth = gScreenOrientation == PORTRAIT ? w / w2 : w / h2
  // let scaleHeight = gScreenOrientation == PORTRAIT ? h / h2 : h / w2
  // let scale = Math.min(scaleWidth, scaleHeight)

  // size = Math.round((size * scale + 0.5) * pixelRatio / fontScale)
  // return size / defaultPixel
  return size
}

/**
 * 屏幕适配,缩放所有视图的size,根据屏幕适配，保证不同屏幕显示的 比例一致
 * 屏幕旋转后，此方法的 结果必须 重新计算，故 scale 不能 写死
 * 坑: 根据屏幕宽度计算出的 单位不能 被此方法 包裹，否则 =不同屏幕宽度就不一致了
 * gScreenOrientation: 屏幕旋转后 改变
 * @param size
 * @returns {number}
 */
export function scaleSize (size) {
  let w = deviceWidth//Dimensions.get('window').width
  let h = deviceHeight//Dimensions.get('window').height
  let scaleWidth = gScreenOrientation == PORTRAIT
    ? w / w2
    // MathUtils.subtract(w,w2,4) :
    : w / h2
  // MathUtils.subtract(w,h2,4);
  let scaleHeight = gScreenOrientation == PORTRAIT
    ? h / h2
    // MathUtils.subtract(h,h2,4)
    // : MathUtils.subtract(h,w2,4);
    : h / w2
  let scale = Math.min(scaleWidth, scaleHeight)//返回 2个 参数中最小的值

  //可把一个数字舍入为最接近的整数,例如，3.5 将舍入为 4，而 -3.5 将舍入为 -3。
  size = Math.round(
    size * scale +
    // MathUtils.multiply(size,scale,4)
    0.5)// 避免精度缺失 +0。5
  return (size / defaultPixel) * 2
  // MathUtils.subtract(size,defaultPixel,4)
}

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX () {
// return (
//   Platform.OS === 'ios' &&
//       ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
//       (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
// )
  return _isIphoneX
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX (iphoneXStyle, iosStyle = {}, androidStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  } else if (Platform.OS === 'ios') {
    return iosStyle
  } else {
    if (androidStyle) return androidStyle
    return iosStyle
  }
}

/**
 * https://juejin.im/post/5ce66c26e51d4555fd20a2a0
 * TextInput 组件字体适配
 */
export function textInputFont (fontSize) {
  return Platform.OS === 'android' ? fontSize / PixelRatio.getFontScale() : fontSize
}

/**
 * 输入的值 占 屏幕宽的 百分比
 * @param percentage
 * @returns {number}
 */
export function windowWidthPercent (percentage) {
  const value = (percentage * deviceWidth) / 100
  return Math.round(value)
}

