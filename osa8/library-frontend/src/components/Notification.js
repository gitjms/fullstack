import React from 'react'

export const Notify = ({ message }) => {
  if ( !message ) {
    return null
  }

  return (
    <div style={{ color: 'green' }}>
      {message}
    </div>
  )
}

export const NotifyError = ({ message }) => {
  if ( !message ) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {message}
    </div>
  )
}
