import React, {useState} from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const CreateNew = ({ props }) => {

  const [ form, setForm ] = useState(true)
  const content = useField(form)
  const author = useField(form)
  const info = useField(form)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    props.setAnecdotes(props.anecdotes.concat(anecdote))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }

    addNew(newAnecdote)
    setForm(true)
    props.setFromCreate(false)
    props.setNotification(`a new anecdote  ${newAnecdote.content} created!`)
    setTimeout(() => {
      props.setNotification(null)
    }, 10000)
  }

  const padding = {
    padding: '5px'
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control {...content} />
          <Form.Label>author:</Form.Label>
          <Form.Control {...author} />
          <Form.Label>url for more info:</Form.Label>
          <Form.Control {...info} />
          <br />
          <Button variant='primary' type='submit' onClick={handleSubmit}>create</Button>
          <span style={padding}></span>
          <Button variant='primary' type='submit' onClick={() => setForm(false)}>reset</Button>
        </Form.Group>
      </Form>
    </div>
  )

}

export default CreateNew