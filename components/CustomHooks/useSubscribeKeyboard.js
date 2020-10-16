import React, { useEffect, useRef, useState, useMemo, memo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Image, View, SafeAreaView, StyleSheet, Keyboard ,Platform} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ViewPropTypes from '../ViewPropTypes'


useSubscribeKeyboard.propTypes = {}

useSubscribeKeyboard.defaultProps = {}

/**
 * PureComponent
 * eg:
 *    useSubscribeKeyboard({
        keyboardShow: ({ keyboardH }) => {
          console.log(`useSubscribeKeyboard keyboardShow keyboardH=`, keyboardH)
        },
        keyboardHide: () => {
          console.log(`useSubscribeKeyboard keyboardHide`)
        }
      })
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
export default function useSubscribeKeyboard (props) {
  const { keyboardShow, keyboardHide } = props
  /**
   * keyboardH cannot be stored in the state. Otherwise, although the value in the current user-defined hooks is changed, the keyboardH obtained in the componentdidupdate of the current component after the parent component is rerender is still the original, so it can only be stored in the ref.current
   * @type {React.MutableRefObject<number>}
   */
  const r_keyboardH = useRef(0)

  const _keyboardShow = useCallback((e) => {
    console.log(`useSubscribeKeyboard useCallback  _keyboardShow keyboardH`, r_keyboardH.current)
    if (r_keyboardH.current === 0) {
      r_keyboardH.current = e.endCoordinates.height
      keyboardShow && keyboardShow({ keyboardH: e.endCoordinates.height })
    }
  }, [keyboardShow])

  const _keyboardHide = useCallback(() => {
    console.log(`useSubscribeKeyboard useCallback  _keyboardHide keyboardH`, r_keyboardH.current)
    if (r_keyboardH.current !== 0) {
      r_keyboardH.current = 0
      keyboardHide && keyboardHide()
    }
  }, [keyboardHide])

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      console.log(`useSubscribeKeyboard componentDidMount`)

      //todo
      let keyboardShowListener, keyboardHideListener
      if (keyboardShow) {
        if (Platform.OS==='ios') {
          keyboardShowListener = Keyboard.addListener(
            'keyboardWillShow',
            _keyboardShow,
          )
        } else {
          keyboardShowListener = Keyboard.addListener(
            'keyboardDidShow',
            _keyboardShow
          )
        }
      }
      if (keyboardHide) {
        if (Platform.OS==='ios') {
          keyboardHideListener = Keyboard.addListener(
            'keyboardWillHide',
            _keyboardHide,
          )
        } else {
          keyboardHideListener = Keyboard.addListener(
            'keyboardDidHide',
            _keyboardHide
          )
        }
      }

      //componentWillUnmount
      return () => {
        console.log(`useSubscribeKeyboard componentWillUnmount`)
        keyboardShowListener?.remove()
        keyboardHideListener?.remove()
      }
    }, [])

  /*
  componentDidUpdate
  */
  useEffect(() => {
    console.log(`useSubscribeKeyboard componentDidUpdate keyboardH=`, r_keyboardH.current)
  })
}
