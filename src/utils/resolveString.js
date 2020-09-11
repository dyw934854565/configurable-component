import get from './get'
import mapValues from 'lodash.mapvalues'
export default function resolveString (source, data = {}, ignore = {options: 1, lazyLoad: 1}) {
  if (typeof source === 'function') return source(data)
  if (Array.isArray(source)) {
    return source.map(item => resolveString(item, data, ignore))
  }
  if (typeof source === 'object') {
    return mapValues(source, (item, key) => {
      if (ignore[key]) return item
      return resolveString(item, data, ignore)
    })
  }
  if (typeof source !== 'string') return source
  const runCode = path => {
    // eslint-disable-next-line no-new-func
    const fn = new Function('data', `
      with(data) {
        return ${path}
      }
    `)
    return fn({...data, window})
  }
  // 匹配只有单个的情况，防止被强制转成字符串
  if (source[0] === '$' && source[1] === '{' && source[source.length - 1] === '}') {
    return runCode(source.substr(2, source.length - 3))
  }
  const res = source.replace(/\$\{(.+?)\}/g, ($, path) => {
    return runCode(path)
  })
  if (res === source) {
    return get(data, res, res)
  }
  return res
}
