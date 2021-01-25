import React, { useEffect, useRef, useState, useMemo, memo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Image, View, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Text from '../Text/Text'
import Button from '../Button'
import appStyle from '../../styles/appStyle'
import ViewPropTypes from '../ViewPropTypes'
import { useFocusEffect } from '@react-navigation/native'

const { dp } = appStyle

useNavFocusListener.propTypes = {}

useNavFocusListener.defaultProps = {}

/**
 * PureComponent
 * eg:
 *    useNavFocusListener({
        navigation, onFocus: () => {
          console.log(`useNavFocusListener onFocus`)
        }, isLightStatusBar: true,
      })
 * @param props
 * @returns {*}
 * @constructor
 */
export default function useNavFocusListener (props) {
  const { onFocus, unfocused, isDarkStatusBar, isLightStatusBar=true, statusBarBackgroundColor = appStyle.appThemeColor } = props

  // https://blog.csdn.net/Cui_xing_tian/article/details/105294567
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      console.log('useNavFocusListener.js focused')
      _onFocus()
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        unfocused && unfocused()
        console.log('useNavFocusListener.js unfocused')
      }
    }, [])
  )

  const _onFocus = useCallback(() => {
    console.log('useNavFocusListener useCallback,onFocus')

    if (isLightStatusBar) {
      gAndroid && StatusBar.setTranslucent(false)
      StatusBar.setBarStyle('light-content', true)
    } else if (isDarkStatusBar) {
      gAndroid && StatusBar.setTranslucent(false)
      StatusBar.setBarStyle('dark-content', true)
    }
    if (statusBarBackgroundColor && gAndroid) {
      StatusBar.setBackgroundColor(statusBarBackgroundColor)
    }

    onFocus && onFocus()
  }, [onFocus])

  /**
   * componentDidMount && componentWillUnmount
   */
  // useEffect(
  //   /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
  //   () => {
  //     console.log(`useNavFocusListener componentDidMount,props=`, props)
  //
  //     //todo
  //     const focusListener = navigation?.addListener('focus', _onFocus)
  //     //componentWillUnmount
  //     return () => {
  //       console.log(`useNavFocusListener componentWillUnmount`)
  //       focusListener()
  //     }
  //   }, [])

  /*
 componentDidUpdate
 */
  useEffect(() => {
    console.log('useNavFocusListener componentDidUpdate')
  })
}
