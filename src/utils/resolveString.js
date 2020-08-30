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
  const res = source.replace(/\$\{(.+?)\}/g, ($, path) => {
    // eslint-disable-next-line no-new-func
    const fn = new Function('data', `
      with(data) {
        return ${path}
      }
    `)
    return fn({...data, window})

    // path = path.replace(/\s/g, '')
    // return get(data, path)
  })
  if (res === source) {
    return get(data, res, res)
  }
  return res
}
