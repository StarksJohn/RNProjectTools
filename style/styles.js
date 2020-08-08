/**
 * Created by guoshuyu on 2017/11/7.
 */
import React, { StyleSheet, Dimensions, PixelRatio, Platform, StatusBar } from 'react-native'
import { ifIphoneX, isIphoneX, scaleSize } from './ScreenUtils'

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height
export const navBarHeight = scaleSize(44) // (Platform.OS === 'ios') ? iosnavHeaderHeight : andrnavHeaderHeight
export const statusHeight = (Platform.OS === 'android') ? StatusBar.currentHeight : 25
export const drawerWidth = screenWidth / 3 * 2

export const shadowRadius = (Platform.OS === 'android') ? 5 : 2
export const elevation = (Platform.OS === 'android') ? 2 : 1
export const pageCellMarginL = 12
/**
 * 顶部状态栏高度 https://juejin.im/post/5c4949bc6fb9a049bd42a6eb
 * 在 iOS 中，页面默认全屏（状态栏不占空间），状态栏内容默认是深色
 * 在 Android 中，页面默认非全屏（状态栏占空间），状态栏内容默认是浅色
 * React Native 官方提供了 StatusBar 组件用于控制状态栏，支持设置内容深浅色，状态栏背景（Android）等。不同于 Android 中的状态栏，在 React Native 中状态栏是公用的，任何一个地方修改状态栏都会导致状态栏发生变化，即使切换到了其他未设置的页面。因此，我们需要在每个页面渲染时都设置一下相应的状态栏，或是在离开设置了状态栏的页面时重置状态栏
 */
export const statusBarH = Platform.OS === 'ios' ? (isIphoneX() ? 34 : 18) : StatusBar.currentHeight/*安卓默认12*/
export const mainBackgroundColor = '#ececec'
export const primaryColor = '#24292e'

const _gStyles = {
  statusBarH, navBarHeight,
  //没有 NavBar 控件时 页面顶部的 paddingTop
  fullScreenPaddingTop: ifIphoneX({ paddingTop: scaleSize(statusBarH) }, { paddingTop: scaleSize(statusBarH) }, { paddingTop: scaleSize(statusBarH) }),
  appStyle:
    {
      backgroundColor: '#F25858',
      color: '#e65363',//通用字体颜色
      paddingLeft: pageCellMarginL,
      paddingRight: pageCellMarginL,
      width: screenWidth,
      height: screenHeight,
      grayBackColor: '#F5F5F5'
    },
  ipxHeader: 40,//ipx顶部偏移量
  ipxPaddingBottom: {//ipx底部偏移量
    height: 25,
  },
  pageCellW: {//页面里的cell 的宽
    width: screenWidth - pageCellMarginL * 2
  },
  pageCellMarginL: {
    marginLeft: pageCellMarginL,
  },
  centered: {
    justifyContent: 'center',
    alignItems:
      'center'
  },
  //二级页面的 statusBar的 style,直接隐藏 node_modules/react-native-navbar/index.js 里的 statusBar
  twoLevelPageStatusBar: {
    tintColor: 'red', animated: true, height: statusBarH,
    style: 'dark-content', hidden: true, translucent: true
  },
  /**
   * 随即色
   * @returns {string}`
   */
  randomColor: function randomColor () {
    return '#' +
      (function (color) {
        return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
        && (color.length == 6) ? color : arguments.callee(color)//如果 本文件 'use strict';  此处的 callee 就报错
      })('')
  },

  //半透明颜色
  translucentColor: ({ r, g, b, a }) => {
    return `rgba(${r},${g},${b},${a})`
  },
  color: {
    _transparent: 'transparent',//透明背景色
  }
}

export default _gStyles

