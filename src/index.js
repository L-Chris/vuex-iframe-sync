import Subject from './Subject'
import {ObserverIframe} from './Observer'
import {noop, isFunction} from './utils'
import {staticOptions} from './const'

// sync from parent to iframe
export const broadcast = (ids, options = {}) => store => {
  let {moduleName, parentPrefix, childPrefix} = options
  Subject.moduleName = moduleName || staticOptions.moduleName
  Subject.parentPrefix = parentPrefix || staticOptions.parentPrefix
  Subject.childPrefix = childPrefix || staticOptions.childPrefix

  new Subject({ids, store})
}

// sync from iframe to parent or other iframe
export const transfer = (vm, options = {}) => store => {
  const {id} = window.frameElement
  const {$store} = vm

  let {moduleName, parentPrefix, childPrefix, created, destroyed} = options
  ObserverIframe.moduleName = moduleName || staticOptions.moduleName
  ObserverIframe.parentPrefix = parentPrefix || staticOptions.parentPrefix
  ObserverIframe.childPrefix = childPrefix || staticOptions.childPrefix

  created = isFunction(created) ? created : noop
  destroyed = isFunction(destroyed) ? destroyed : noop

  new ObserverIframe({id, $store, store, created, destroyed})
}
