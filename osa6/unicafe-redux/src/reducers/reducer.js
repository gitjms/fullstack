const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  total: 0,
  grade: 0,
  positives: 0
}

const counterReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'GOOD':
      return {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad,
        total: state.total + 1,
        grade: state.grade + 1,
        positives: state.positives + 1
      }
    case 'OK':
      return {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad,
        total: state.total + 1,
        grade: state.grade,
        positives: state.positives
      }
    case 'BAD':
      return {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1,
        total: state.total + 1,
        grade: state.grade - 1,
        positives: state.positives
      }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer