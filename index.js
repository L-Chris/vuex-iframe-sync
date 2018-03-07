const moduleName = 'VI_SYNC'
const childPrefix = 'CHILD_'
const parentPrefix = 'PARENT_'
const VALID_TYPE_RE = new RegExp(`^(${childPrefix}|${moduleName})`)

// mutation types
const ADD_IN_BROADCAST_LIST = 'ADD_IN_BROADCAST_LIST'
const DEL_IN_BROADCAST_LIST = 'DEL_IN_BROADCAST_LIST'
const INIT_STATE = 'INIT_STATE'

// sync from parent to iframe
export const broadcast = ids => store => {
  function convertToSaveObject (obj) {
    return obj
  }

  function postMessage (frame, {type, payload} = {}) {
    frame.contentWindow && frame.contentWindow.postMessage({
      type,
      payload: convertToSaveObject(payload)
    }, location.origin)
  }

  if (typeof ids !== 'string') return
  const allFrameIds = ids.split(',')
  const {_mutations: mutations} = store

  // init
  store.registerModule(moduleName, {
    namespaced: true,
    state: {
      liveFrames: []
    },
    getters: {
      liveFrameIds (state) {
        return state.liveFrames.map(_ => _.id)
      }
    },
    mutations: {
      [ADD_IN_BROADCAST_LIST] (state, id) {
        if (allFrameIds.indexOf(id) < 0) return
        const frame = document.getElementById(id)
        if (frame && frame.tagName === 'IFRAME') {
          state.liveFrames.push(frame)
          // initialization sync
          let {[moduleName]: VIModule, ...stateWithoutVIModule} = store.state
          postMessage(frame, {type: INIT_STATE, payload: stateWithoutVIModule})
        }
      },
      [DEL_IN_BROADCAST_LIST] (state, id) {
        let index = state.liveFrames.map(_ => _.id).indexOf(id)
        index >= 0 && state.liveFrames.splice(index, 1)
      }
    }
  })

  // add child mutations
  Object.entries(mutations).forEach(([type, funcList]) => {
    mutations[childPrefix + type] = funcList.map(f => ({id, value}) => {
      f(value)
      store.state[moduleName].liveFrames.forEach(_ => _.id !== id && postMessage(_, {type, payload: value}))
    })
  })

  store.subscribe(({type, payload}, state) => {
    if (VALID_TYPE_RE.test(type)) return
    state[moduleName].liveFrames.forEach(_ => postMessage(_, {type, payload}))
  })
}

// sync from iframe to parent or other iframe
export const transfer = vm => store => {
  const id = window.frameElement.id
  const {_mutations: mutations} = store
  const {$store} = vm

  // frame created: add in broadcast list
  function handleLoad () {
    $store.commit(`${moduleName}/${ADD_IN_BROADCAST_LIST}`, id)
  }
  // frame destoryed: remove from broadcast list
  function handleUnload () {
    $store.commit(`${moduleName}/${DEL_IN_BROADCAST_LIST}`, id)
  }
  // receive message from parent
  function handleMessage ({data}) {
    let {type, payload} = data
    if (!type || !Reflect.has(mutations, type) && type !== INIT_STATE) return
    store.commit(parentPrefix + type, payload)
  }

  window.addEventListener('load', handleLoad)
  window.addEventListener('beforeunload', handleUnload)
  window.addEventListener('message', handleMessage)

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
    $store.commit(childPrefix + type, {id, value: payload})
  })
}
