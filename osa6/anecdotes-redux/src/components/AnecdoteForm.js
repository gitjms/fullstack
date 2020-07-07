import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)
    props.setNotification(`you added '${content}'`,5)
  }

  return (
    <div className='d-flex justify-content-between' style={{ display: 'inline-block' }}>
      <div id='form'>
        <form className='form-inline' onSubmit={addAnecdote}>
          <input name='anecdote' />
          <button type='submit' className='btn btn-success'>add anecdote</button>
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)