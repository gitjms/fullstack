const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [action.notification, action.text]
    default:
      return state
  }
}

export const notificationChange = (notification, text) => {
  
  return {
    type: 'SET_NOTIFICATION',
    notification: notification,
    text: text
  }
}

export default notificationReducer