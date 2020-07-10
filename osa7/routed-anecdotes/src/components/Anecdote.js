import React from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Anecdote = ({ props }) => {
  const id = useParams().id

  const anecdote = props.anecdotes.find(n => n.id === id)

  const vote = (anecdote) => {
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    props.setAnecdotes(props.anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: '10px'
  }

  return (
    <div>
      <br />
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <br />
      has {anecdote.votes} votes
      <span style={padding} />
      <Button variant='outline-primary' size='sm' type='submit'
        onClick={() => vote(anecdote)} >vote</Button>
        <span style={padding} />
      <Button variant='outline-primary' size='sm' type='submit'
        onClick={() => {
          props.setVisible(false)
          props.history.goBack()
          props.history = []
        }} >back
      </Button>
      <br />
      for more info see:<br />
      <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  )
}

export default Anecdote