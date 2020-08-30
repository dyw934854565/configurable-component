import get from 'lodash.get'
import mapValues from 'lodash.mapvalues'
export default function (target, key, defaultVal) {
  if (typeof key === 'object') {
    return mapValues(key, v => get(target, v, v))
  }
  return get(target, key, defaultVal)
}
