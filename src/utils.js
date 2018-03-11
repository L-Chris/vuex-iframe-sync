// type check
const oProto = Object.prototype
const toString = oProto.toString
const hasOwnProperty = oProto.hasOwnProperty

export const noop = () => {}
export const returnSelf = _ => _

function isType (name) {
  return function (obj) {
    return toString.call(obj) === '[object ' + name + ']'
  }
}

export const isError = isType('Error')
export const isFunction = isType('Function')
export const isArray = isType('Array')
export const isDate = isType('Date')

export function isObject (obj) {
  let type = typeof obj
  return (type === 'function' || type === 'object') && !!obj
}

export function isElement (obj) {
  return !!(obj && obj.nodeType === 1)
}

export function cloneWithout (obj, attrs = []) {
  let copy = {}
  for (let attr in obj) {
    attrs.indexOf(attr) < 0 && (copy[attr] = obj[attr])
  }
  return copy
}

export function deepClone (obj) {
  if (obj === null || typeof obj !== 'object') return obj

  if (isDate(obj)) {
    let copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (isArray(obj)) {
    return obj.map(function (_) {
      return deepClone(_)
    })
  }

  if (isObject(obj)) {
    let copy = {}
    for (let attr in obj) {
      if (hasOwnProperty.call(obj, attr)) copy[attr] = deepClone(obj[attr])
    }
    return copy
  }
}
