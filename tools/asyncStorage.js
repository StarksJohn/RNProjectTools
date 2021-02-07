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
    if ( stringTools.isNull(value)) {
      // alert('setItem 参数不是 str 类型,value=', value)
      // console.log('setItem 参数不是 str 类型,value=', value, ' key=', key)
      console.log('asyncStorage.js setItem key=',key,' value不存在')
      return Promise.reject('setItem value不存在');
    }
    if (typeof value !== 'string') {
      console.log('asyncStorage.js setItem value !== string')
      let v=JSON.stringify(value)
      console.log('asyncStorage.js setItem key=',key,' value=',v)
      return await AsyncStorage.setItem(key, value);
    }else{
      console.log('asyncStorage.js setItem key=',key,' value=',value)
      return await AsyncStorage.setItem(key, value);
    }
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
      console.log('asyncStorage.js getItem成功, key=', key, '  value=', value)
      return Promise.resolve(value);
    } else {
      console.log(`未找到 key=${key}的 缓存`)
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
