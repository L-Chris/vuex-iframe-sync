// sync from parent to iframe
export const broadcast = ids => store => {
  if (typeof ids !== 'string') return
  store.subscribe(({type, payload}, state) => {
    ids.split(',').forEach(_ => {
      const frame = document.getElementById(_)
      frame && frame.contentWindow.postMessage({ type, payload }, location.origin)
    })
  })
}

export const wrapMutations = (vm, mutations) => {
  return Object.entries(mutations).reduce((pre, [key, f]) => {
    pre[key] = (state, payload) => {
      f(state, payload)
      vm.$store.commit(key, payload)
    }
    pre[`PARENT_${key}`] = f
    return pre
  }, {})
}

// sync from iframe to parent or other iframe
export const tranfer = (vm, mutations) => store => {
  // receive message from parent
  const handleMessage = ({data}) => {
    let {type, payload} = data
    if (!Reflect.has(store._mutations, type)) return
    type && store.commit(`PARENT_${type}`, payload)
  }
  window.addEventListener('message', handleMessage)
}
