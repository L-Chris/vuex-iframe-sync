// sync from parent to iframe
export const broadcast = ids => store => {
  // wrap mutations
  const {_mutations: mutations} = store
  Object.entries(mutations).forEach(([key, funcList]) => {
    mutations[`CHILD_${key}`] = funcList
  })

  if (typeof ids !== 'string') return
  store.subscribe(({type, payload}, state) => {
    ids.split(',').forEach(_ => {
      const frame = document.getElementById(_)
      frame && frame.contentWindow.postMessage({ type, payload }, location.origin)
    })
  })
}

// sync from iframe to parent or other iframe
export const transfer = vm => store => {
  // wrap mutations
  const {_mutations: mutations} = store
  Object.entries(mutations).forEach(([key, funcList]) => {
    mutations[key] = funcList.map(_ => (state, payload) => {
      _(state, payload)
      vm.$store.commit(`CHILD_${key}`, payload)
    })
    mutations[`PARENT_${key}`] = funcList
  })

  // receive message from parent
  const handleMessage = ({data}) => {
    let {type, payload} = data
    if (!Reflect.has(store._mutations, type)) return
    type && !type.includes('CHILD_') && store.commit(`PARENT_${type}`, payload)
  }
  window.addEventListener('message', handleMessage)
}
