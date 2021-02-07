import tool from '../../tools/tool'
import asyncStorage from '../../tools/asyncStorage'

export default {
  baseEffects : {
    cacheAnAttributeOfInitState: 'cacheAnAttributeOfInitState', //缓存 initState 的某个属性
  },
  baseSubscriptions:{
    //初始化缓存
    initCache:({dispatch, history,attributesToBeCached}) => {
      console.log('baseModel.js subscriptions loadData dispatch=', dispatch);
      _.forEach(attributesToBeCached, async (key) => {
        console.log('baseModel.js initCache forEach key=', key);
        const [e_value, value] = await tool.to(asyncStorage.getItem(key));
        console.log(
          'baseModel.js initCache forEach getItem key=',
          key,
          ' value=',
          value,
        );
        if (value) {
          dispatch({type: key, payload: value});
        }
      });
    }
  }
}
