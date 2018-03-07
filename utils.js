// type check
const oProto = Object.prototype
const toString = oProto.toString
const hasOwnProperty = oProto.hasOwnProperty

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
  return type === 'function' || type === 'object' && !!obj
}

export function isElement (obj) {
  return !!(obj && obj.nodeType === 1)
}

export function deepClone () {
  if (obj === null || typeof obj !== 'object') return obj
  
  if (isDate(obj)) {
    let copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (isArray(obj)) {
    let copy = []
    return obj.map(function (_) {
      return clone(_)
    })
  }

  if (isObject(obj)) {
    let copy = {}
    for (let attr in obj) {
      if (hasOwnProperty.call(obj, attr)) copy[attr] = clone(obj[attr])
    }
    return copy
  }
}