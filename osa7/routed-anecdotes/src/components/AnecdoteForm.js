import React, {useState} from 'react'
import anecdoteService from '../services/anecdotes'
import { useField } from '../hooks'

const CreateNew = ({ props }) => {

  const [ form, setForm ] = useState(true)
  const content = useField(form)
  const author = useField(form)
  const info = useField(form)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
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
      setForm(true)
      props.setFromCreate(false)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>content<input {...content}/></div>
        <div>author<input {...author}/></div>
        <div>url for more info<input {...info}/></div>
        <button type='submit' onClick={handleSubmit}>create</button>
        <button type='submit' onClick={() => setForm(false)}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew