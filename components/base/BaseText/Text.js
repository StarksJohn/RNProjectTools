/**
 * https://juejin.im/post/5ce66c26e51d4555fd20a2a0
 * 避免 安卓 改变了手机系统的字体样式后，App中的字体样式也会改变
 * 如果 不同 fontSize 的 Text 嵌套 想底部对齐，可参考
 *  <Text style={{
          fontSize: gScaleText(16), color: '#EB475C', fontFamily: 'PingFangSC-Semibold', height: gScaleSize(33),
        }}>¥
 <Text
 style={{
          fontSize: gScaleText(30),
              color: '#EB475C',fontFamily: 'PingFangSC-Semibold'
            }}>{item.price}</Text>
 </Text>
 如果想设置圆角，要加 borderRadius:gScaleSize() 和 overflow:'hidden'属性
 如果想避免小屏幕指定宽度内显示不下一行的问题，还想超过指定宽度... ，可设置 maxWidth 和 numberOfLines，可参考 renderVisitNums方法
 */
import React from 'react'

import { StyleSheet, Platform, Text } from 'react-native'
import getFontFamily from './getFontFamily'
// import { Text } from 'native-base'
import objUtils from '../../../tools/objUtils'

/**
 * https://juejin.im/post/5ce66c26e51d4555fd20a2a0
 * App字体大小不随系统字体大小的改变而改变
 */
const TextRender = Text.render
Text.render = function (...args) {
  const originText = TextRender.apply(this, args)
  // const { selectable } = originText.props 不注释就报错
  // if (!selectable) {
  //   let newprops = objUtils.omit(originText.props, ['style', 'children'])
  //   return <BaseText {...newprops} style={originText.props.style}>
  //     {originText.props.children}
  //   </BaseText>
  // } else {
  return React.cloneElement(originText, { allowFontScaling: false })
  // }
}

const baseT = ({ style, ...props }) => {
  const { hasPaddingLeftAndRight } = props
  let _style = style

  // Text style
  const resolvedStyle = StyleSheet.flatten(_style) || {}
  // 通过对 Text style 的检测，拿到对应自定义字体
  const fontFamily = getFontFamily(resolvedStyle.fontFamily, resolvedStyle)
  // 过滤掉 Text style 中的 fontWeight fontStyle 得到新的 style 对象
  const newStyle = objUtils.omit({ ...resolvedStyle, fontFamily }, ['fontStyle'])//

  //外部设置 lineHeight 时 不建议 带上 gScaleSize，因 字体大小没缩放
  if (props.numberOfLines >= 2 && !newStyle['lineHeight'] && Platform.OS === 'android') {//2 行以上在安卓上 显示有问题，必须加 lineHeight
    newStyle['lineHeight'] = (newStyle.fontSize * 1.5)
  }

  if (!hasPaddingLeftAndRight) {
    newStyle.paddingLeft = 0
    newStyle.paddingRight = 0
  }

  if (!newStyle.alignSelf) {//避免text的width被默认填充其父视图width，故给 alignSelf 设置默认值;View 也是如此
    newStyle.alignSelf = 'flex-start'
  }

  // console.log('newStyle=', newStyle)
  return (
    <Text
      {...props}
      // selectable={true}
      style={newStyle}
    />
  )
}

export default baseT
