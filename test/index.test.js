import Vue from 'vue'
import Vuex from 'vuex'
import {staticOptions, ADD_IN_BROADCAST_LIST, DEL_IN_BROADCAST_LIST} from '../src/const'
import {broadcast, transfer} from '../src'

Vue.use(Vuex)

const run = () => {
  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      'ADD_COUNT' (state, payload) {
        state.count += payload
      }
    }
  })

  const app = new Vue({
    store,
    render: h => h('div')
  }).$mount()

  return {app, store}
}

describe('broadcast', () => {
  test('options', () => {
    const ids = 'id1,id2'
    const moduleName = 'moduleName'
    const parentPrefix = '$PARENT_'
    const childPrefix = '$CHILD_'
  
    let {app, store} = run()
    const subject = broadcast(ids, { moduleName, parentPrefix, childPrefix })(store)

    let Subject = subject.constructor
  
    expect(store.state[moduleName]).toBeDefined()
    expect(store._mutations).toHaveProperty(`${moduleName}/${ADD_IN_BROADCAST_LIST}`)
    expect(store._mutations).toHaveProperty(`${moduleName}/${DEL_IN_BROADCAST_LIST}`)
  
    expect(Subject.moduleName).toEqual(moduleName)
    expect(Subject.parentPrefix).toEqual(parentPrefix)
    expect(Subject.childPrefix).toEqual(childPrefix)
  })
})

describe('transfer', () => {
  test('options', () => {
    const id = '1'
    const moduleName = 'moduleName'
    const parentPrefix = '$PARENT_'
    const childPrefix = '$CHILD_'

    let {app, store} = run()
    const observer = transfer({ id, moduleName, parentPrefix, childPrefix })(store)

    let Observer = observer.constructor

    expect(Observer.moduleName).toEqual(moduleName)
    expect(Observer.parentPrefix).toEqual(parentPrefix)
    expect(Observer.childPrefix).toEqual(childPrefix)
  })
})
