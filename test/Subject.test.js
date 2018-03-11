import Vue from 'vue'
import Vuex from 'vuex'
import Subject from '../src/Subject'
import {staticOptions, ADD_IN_BROADCAST_LIST, DEL_IN_BROADCAST_LIST} from '../src/const'
const ADD_COUNT = 'ADD_COUNT'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    [ADD_COUNT] (state, payload) {
      state.count += payload
    }
  }
})

describe('Subject', () => {
  const ids = 'id1,id2'
  const convert = jest.fn()
  const subject = new Subject({ids, store, convert})
  const spyOnCommit = jest.spyOn(store, 'commit')

  test('attribute', () => {
    expect(subject.allFrameIds).toEqual(ids.split(','))
    expect(subject.store).toEqual(store)
    expect(subject.convert).toEqual(convert)
  })
  
  test('method: update', () => {
    let data = { type: ADD_COUNT, payload: 1 }
    subject.update({ data })

    expect(spyOnCommit).toHaveBeenLastCalledWith(ADD_COUNT, data.payload)
  })
})
