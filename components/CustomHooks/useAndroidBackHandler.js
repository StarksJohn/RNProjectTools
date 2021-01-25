import React, { useEffect, useRef, useState, useMemo, memo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Image, View, SafeAreaView, StyleSheet, BackHandler } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ViewPropTypes from '../ViewPropTypes'


useAndroidBackHandler.propTypes = {}

useAndroidBackHandler.defaultProps = {}

/**
 * PureComponent
 * Added to the page component, used to exit the current page after clicking the return button of the device on Android
 * If a keyboard pops up in the page, after clicking the return button of Android device, the keyboard will be folded up first, and then it will exit the page
 * eg:
 *  useAndroidBackHandler({
    navigation
  })
 * @param props
 * @returns {*}
 * @constructor
 */
export default function useAndroidBackHandler (props) {
  const dispatch = useDispatch()
  const {} = useSelector((state) => state)
  const { navigation, handleBackPress } = props

  //If you want to intercept the Android return event on the specific page, override this method
  const _handleBackPress = useCallback(() => {
    console.log('useAndroidBackHandler handleBackPress')
    if (handleBackPress) {
      return handleBackPress()
    }
    navigation?.goBack()
    return true
  }, [handleBackPress])

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      console.log('useAndroidBackHandler componentDidMount')
      // gNavigation = navigation // for NavBackBt.js gNavigation.goBack()

      //todo
      BackHandler.addEventListener('hardwareBackPress', _handleBackPress)

      //componentWillUnmount
      return () => {
        console.log('useAndroidBackHandler componentWillUnmount')
        BackHandler.removeEventListener('hardwareBackPress', _handleBackPress)
      }
    }, [])

  /*
  componentDidUpdate
  */
  useEffect(() => {
    console.log('useAndroidBackHandler componentDidUpdate,props=', props)
  })

}

const Styles = StyleSheet.create({})
