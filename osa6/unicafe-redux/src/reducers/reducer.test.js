import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    total: 0,
    grade: 0,
    positives: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    deepFreeze(state)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    const action = {
      type: 'GOOD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0, total: 1, grade: 1, positives: 1 })
  })

  test('ok is incremented', () => {
    const state = initialState
    const action = {
      type: 'OK'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ good: 0, ok: 1, bad: 0, total: 1, grade: 0, positives: 0 })
  })

  test('bad is incremented', () => {
    const state = initialState
    const action = {
      type: 'BAD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ good: 0, ok: 0, bad: 1, total: 1, grade: -1, positives: 0 })
  })

  test('reset state makes all zero (initial state)', () => {
    const state = {
      good: 10,
      ok: 20,
      bad: 30
    }
    const action = {
      type: 'ZERO'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ good: 0, ok: 0, bad: 0, total: 0, grade: 0, positives: 0 })
  })
})