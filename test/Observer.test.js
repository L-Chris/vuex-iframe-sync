import Vue from 'vue'
import Vuex from 'vuex'
import {ObserverIframe, Observer} from '../src/Observer'
import {staticOptions, INIT_STATE, ADD_IN_BROADCAST_LIST, DEL_IN_BROADCAST_LIST} from '../src/const'

const ADD_COUNT = 'ADD_COUNT'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    [ADD_COUNT] (state) {
      state.count++
    }
  }
})

describe('ObserverIframe', () => {
  let id = 'test'
  let el = {
    contentWindow: {
      postMessage: jest.fn()
    }
  }
  
  const observerIframe = new ObserverIframe({id, el})

  test('attribute', () => {
    expect(observerIframe.id).toEqual(id)
    expect(observerIframe.el).toEqual(el)
  })

  test('method:update', () => {
    const {postMessage} = el.contentWindow
    const type = 'test'
    const payload = 1

    observerIframe.update(type, payload)
    expect(postMessage.mock.calls.length).toBe(1)
    expect(postMessage.mock.calls[0][0]).toEqual({type, payload})
  })
})

describe('Observer', () => {
  let id = 'test'
  let parent = {
    postMessage: jest.fn()
  }
  let convert = jest.fn()
  let created = jest.fn()
  let destroyed = jest.fn()

  const observer = new Observer({id, parent, store, convert, created, destroyed})
  const spyOnSend = jest.spyOn(observer, 'send')
  const spyOnCommit = jest.spyOn(store, 'commit')

  test('attribute', () => {
    expect(observer.id).toEqual(id)
    expect(observer.store).toEqual(store)
    expect(observer.parent).toEqual(parent)
    expect(observer.convert).toEqual(convert)
    expect(observer.createdCallback).toEqual(created)
    expect(observer.destroyedCallback).toEqual(destroyed)
  })

  test('method: send', () => {
    let type = 'test'
    let payload = 1
    observer.send(type, payload)

    expect(convert).toHaveBeenLastCalledWith(payload)
    expect(parent.postMessage.mock.calls.length).toBe(1)
    expect(parent.postMessage.mock.calls[0][0].type).toEqual(type)
    expect(parent.postMessage.mock.calls[0][0]).toHaveProperty('payload')
  })

  test('method: load', () => {
    observer.load()
    expect(spyOnSend).toHaveBeenLastCalledWith(`${Observer.moduleName}/${ADD_IN_BROADCAST_LIST}`, id)
    expect(created.mock.calls.length).toBe(1)
  })
  test('method: unLoad', () => {
    observer.unLoad()
    expect(spyOnSend).toHaveBeenLastCalledWith(`${Observer.moduleName}/${DEL_IN_BROADCAST_LIST}`, id)
    expect(destroyed.mock.calls.length).toBe(1)
  })

  test('method: update', () => {
    let data = { type: ADD_COUNT, payload: 1 }
    observer.update({ data })

    expect(spyOnCommit).toHaveBeenLastCalledWith(Observer.parentPrefix + ADD_COUNT, data.payload)

    let initData = {type: INIT_STATE, payload: {}}
    observer.update({ data: initData })
    expect(spyOnCommit).toHaveBeenLastCalledWith(Observer.parentPrefix + INIT_STATE, initData.payload)
  })
})

