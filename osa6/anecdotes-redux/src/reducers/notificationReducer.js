export const setNotification = (text, time) => {
  return async dispatch => {
    await dispatch(notificationChange(text))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 1000*time)
    
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