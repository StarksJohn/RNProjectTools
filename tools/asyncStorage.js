import AsyncStorage from '@react-native-community/async-storage';
import *as stringTools from './stringTools'
/**
 *
 * @param key
 * @param value 最好是 str 类型，其他类型真机ios 报错
 * @returns {Promise<void | *>}
 */
const setItem = async (key, value) => {
  try {
    // console.log('setItem key=', key, ' value=', value)
    if (typeof value !== 'string' || stringTools.isNull(value)) {
      // alert('setItem 参数不是 str 类型,value=', value)
      // console.log('setItem 参数不是 str 类型,value=', value, ' key=', key)
      return Promise.reject('setItem 参数不是 str 类型');
    }
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    throw new Error(`缓存 key=${key}的 失败`);
  }
};

const removeItem = async key => {
  await AsyncStorage.removeItem(key);
};

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      // console.log('AsyncStorage.getItem成功, key=', key, '&value=', value)
      return Promise.resolve(value);
    } else {
      // console.log(`未找到 key=${key}的 缓存`)
      return Promise.reject(null);
    }
  } catch (e) {
    // error reading value
    // throw new Error(`未找到 key=${key}的 缓存`)
    console.log(`未找到 key=${key}的 缓存`);
    return Promise.reject(null);
  }
};

export default {
  setItem,
  removeItem,
  getItem,
};
