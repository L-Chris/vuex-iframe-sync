import {isFunction, cloneWithout} from '../src/utils'

test('utils.isFunction', () => {
  expect(isFunction(jest.fn())).toBeTruthy()
  ;[{}, '', 0, undefined, null, new Date(), new RegExp()].forEach(_ => {
    expect(isFunction(_)).toBeFalsy()  
  })
})

test('utils.cloneWithout', () => {
  const data = {
    a: 1,
    b: 2,
    c: 3
  }
  expect(cloneWithout(data, ['a', 'b'])).toEqual({c: 3})
})