import {Observer} from './Observer'
import {
  ADD_IN_BROADCAST_LIST,
  DEL_IN_BROADCAST_LIST,
  INIT_STATE
} from './const'

export default class Subject {
  constructor ({ids, store}) {
    this.allFrameIds = ids.split(',')
    this.observerList = []
    this.store = store

    this.init()
  }

  addObserver (id) {
    if (this.allFrameIds.indexOf(id) < 0) return
    const iframe = document.getElementById(id)
    if (iframe && iframe.tagName === 'IFRAME') {
      let observer = new Observer({id, el: iframe})
      this.observerList.push(observer)
      this.notifyObserver(observer, INIT_STATE, this.store.state)
    }
  }

  deleteObserver (id) {
    const index = this.observerList.map(_ => _.id).indexOf(id)
    index >= 0 && this.observerList.splice(index, 1)
  }

  notifyObserver (obs, type, payload) {
    obs.update(type, payload)
  }

  notifyObservers ({id, type, value}) {
    for (let obs of this.observerList.filter(_ => _.id !== id)) {
      obs.update(type, value)
    }
  }

  init () {
    const that = this
    const {_mutations: mutations} = that.store
    const {moduleName, childPrefix} = Subject

    that.store.registerModule(moduleName, {
      namespaced: true,
      mutations: {
        [ADD_IN_BROADCAST_LIST] (state, id) {
          that.addObserver(id)
        },
        [DEL_IN_BROADCAST_LIST] (state, id) {
          that.deleteObserver(id)
        }
      }
    })

    // add child mutations
    Object.entries(mutations).forEach(([type, funcList]) => {
      mutations[childPrefix + type] = funcList.map(f => ({id, value}) => {
        f(value)
        that.notifyObservers({id, type, value})
      })
    })

    const VALID_TYPE_RE = new RegExp(`^(${childPrefix}|${moduleName})`)
    that.store.subscribe(({type, payload}, state) => {
      if (VALID_TYPE_RE.test(type)) return
      that.notifyObservers({type, value: payload})
    })
  }
}

Subject.moduleName = ''
Subject.parentPrefix = ''
Subject.childPrefix = ''
