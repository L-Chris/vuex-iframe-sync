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
  constructor ({id, $store, store, created, destroyed}) {
    this.id = id
    this.$store = $store
    this.store = store

    this.createdCallback = isFunction(created) ? created : noop
    this.destroyedCallback = isFunction(destroyed) ? destroyed : noop
    this.init()
  }

  init () {
    const {id, $store, store} = this
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
      $store.commit(childPrefix + type, {id, payload})
    })

    // add addEventListener
    window.addEventListener('load', this.load.bind(this))
    window.addEventListener('message', this.update.bind(this))
    window.addEventListener('beforeunload', this.unLoad.bind(this))
  }

  update (e) {
    let {store} = this
    const {parentPrefix} = Observer
    let { data: {type, payload} } = e
    if ((!type || !Reflect.has(store._mutations, type)) && type !== INIT_STATE) return
    store.commit(parentPrefix + type, payload)
  }

  load () {
    this.$store.commit(`${Observer.moduleName}/${ADD_IN_BROADCAST_LIST}`, this.id)
    this.created()
  }
  unLoad () {
    this.$store.commit(`${Observer.moduleName}/${DEL_IN_BROADCAST_LIST}`, this.id)
    this.destroyed()
  }

  // hook
  created () {
    this.createdCallback(this.id, this.store, this.$store)
  }
  destroyed () {
    this.destroyedCallback(this.id, this.store, this.$store)
  }
}

Observer.moduleName = ''
Observer.parentPrefix = ''
Observer.childPrefix = ''
