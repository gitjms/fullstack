import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {

  if (notification === null) {
    return null
  }

  return (
    <div className='container'>
      {(notification &&
        <Alert variant='success'>
          {notification}
        </Alert>
      )}
    </div>
  )
}

export default Notification
