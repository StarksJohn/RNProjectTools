import React, { useEffect, useRef, useState, useMemo, memo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Image, View, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ViewPropTypes from '../ViewPropTypes'


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
  const dispatch = useDispatch()
  const {} = useSelector((state) => state)
  const { navigation, onFocus, isDarkStatusBar, isLightStatusBar, statusBarBackgroundColor } = props

  const _onFocus = useCallback(() => {
    console.log(`useNavFocusListener useCallback,onFocus`)

    if (isLightStatusBar) {
      Platform.OS==='android' && StatusBar.setTranslucent(false)
      StatusBar.setBarStyle('light-content', true)
    } else if (isDarkStatusBar) {
      Platform.OS==='android' && StatusBar.setTranslucent(false)
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
  useEffect(
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      console.log(`useNavFocusListener componentDidMount,props=`, props)

      //todo
      const focusListener = navigation?.addListener('focus', _onFocus)
      //componentWillUnmount
      return () => {
        console.log(`useNavFocusListener componentWillUnmount`)
        focusListener()
      }
    }, [])

  /*
 componentDidUpdate
 */
  useEffect(() => {
    console.log(`useNavFocusListener componentDidUpdate`)
  })
}
