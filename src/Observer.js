import {noop, isFunction} from './utils'
import {
  ADD_IN_BROADCAST_LIST,
  DEL_IN_BROADCAST_LIST,
  INIT_STATE
} from './const'

export class ObserverIframe {
  constructor ({id, el}) {
    this.id = id
    this.el = el
  }

  update (type, payload) {
    this.el && this.el.contentWindow.postMessage({
      type,
      payload
    }, location.origin)
  }
}

export class Observer {
  constructor ({id, parent, store, created, destroyed}) {
    this.id = id
    this.store = store
    this.parent = parent || window.parent

    this.createdCallback = isFunction(created) ? created : noop
    this.destroyedCallback = isFunction(destroyed) ? destroyed : noop
    this.init()
  }

  init () {
    const that = this
    const {id, store} = this
    const {_mutations: mutations} = store
    const {parentPrefix, childPrefix} = Observer

    // add parent mutations
    Object.entries(mutations).forEach(([type, funcList]) => {
      mutations[parentPrefix + type] = funcList
    })
    // init mutation
    mutations[parentPrefix + INIT_STATE] = [payload => {
      Object.assign(store.state, payload)
    }]

    store.subscribe(({type, payload}, state) => {
      if (type.indexOf(parentPrefix) >= 0) return
      that.send(childPrefix + type, {id, payload})
    })

    // add addEventListener
    window.addEventListener('load', this.load.bind(this))
    window.addEventListener('message', this.update.bind(this))
    window.addEventListener('beforeunload', this.unLoad.bind(this))
  }
  update ({ data: {type, payload} }) {
    const {store} = this
    if ((!type || !Reflect.has(store._mutations, type)) && type !== INIT_STATE) return
    const {parentPrefix} = Observer
    store.commit(parentPrefix + type, payload)
  }

  send (type, payload) {
    this.parent && this.parent.postMessage({type, payload}, location.origin)
  }

  load () {
    this.send(`${Observer.moduleName}/${ADD_IN_BROADCAST_LIST}`, this.id)
    this.created()
  }
  unLoad () {
    this.send(`${Observer.moduleName}/${DEL_IN_BROADCAST_LIST}`, this.id)
    this.destroyed()
  }

  // hook
  created () {
    this.createdCallback(this.id, this.store, this.send.bind(this))
  }
  destroyed () {
    this.destroyedCallback(this.id, this.store, this.send.bind(this))
  }
}

Observer.moduleName = ''
Observer.parentPrefix = ''
Observer.childPrefix = ''
