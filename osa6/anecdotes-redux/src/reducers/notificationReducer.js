let timeOutList = []

export const setNotification = (text, time) => {
  timeOutList.forEach(tout => typeof tout === 'number' ? clearTimeout(tout) : tout)
  return async dispatch => {
    await dispatch(notificationChange(text))
    timeOutList.push(setTimeout(() => {
      dispatch(notificationChange(null))
      timeOutList = []
    }, 1000*time))
  }
}

export const notificationChange = (text) => {
  return {
    type: 'SET_NOTIFICATION',
    text
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.text
    default:
      return state
  }
}

export default notificationReducer