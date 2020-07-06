import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    const text = 'added \''.concat(`${content}`).concat('\'')
    dispatch(notificationChange('NOTIFICATION',text))
    setTimeout(() => {
      dispatch(notificationChange(null,null))
    }, 5000)
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

export default AnecdoteForm