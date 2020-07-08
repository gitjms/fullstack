import React from 'react'

const Notification = ({ notification }) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  }

  if (notification === null) {
    return null
  }

  return (
    <div className='message' style={messageStyle} >
      {notification}
    </div>
  )
}

export default Notification
