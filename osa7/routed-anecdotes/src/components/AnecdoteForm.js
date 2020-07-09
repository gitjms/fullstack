import React, { useState } from 'react'
import anecdoteService from '../services/anecdotes'

const CreateNew = ({ props }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()

    const newAnecdote = {
      content,
      author,
      info,
      votes: 0
    }

    anecdoteService
      .create(newAnecdote)
      .then((returnedAnecdote) => {
        props.setAnecdotes(props.anecdotes.concat(returnedAnecdote))
      })
      .catch(error => {
        props.setNotification(`${error}`)
        setTimeout(() => {
          props.setNotification(null)
        }, 4000)
      })
      props.setNotification(`a new anecdote  ${newAnecdote.content} created!`)
      setTimeout(() => {
        props.setNotification(null)
      }, 10000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew