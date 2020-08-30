import get from './get'
import resolveString from './resolveString'
import isEmpty from 'lodash.isempty'
export default async function makeRequest (param = {}, {url = '', body = {}, axios, responseType, dataMap = {}, dataPath = 'data', transformObj = true, method = 'get', cancel} = {}) {
  if (!axios) {
    return Promise.reject(new Error('axios required'))
  }
  if (cancel) {
    if (typeof cancel === 'function' && cancel(param)) {
      // 用false不会出错误提醒
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false)
    }
    if (typeof cancel === 'string' && !get(param, cancel)) {
      // 用false不会出错误提醒
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false)
    }
  }
  const res = await axios({
    method,
    url: resolveString(url, param),
    data: resolveString(body, param),
    responseType
  })
  let data = get(res, dataPath, [])
  if (transformObj && !Array.isArray(data)) {
    data = Object.entries(data)
  }
  // dataMap存在的话需要对数组对象进行一次映射

  if (dataMap && !isEmpty(dataMap)) {
    if (Array.isArray(data)) {
      return data.map(item => get(item, dataMap))
    } else {
      return get(data, dataMap)
    }
  }
  return data || []
}
