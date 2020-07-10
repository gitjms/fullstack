import React from 'react'
import { useParams } from 'react-router-dom'

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

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>
        has {anecdote.votes} votes
        <button type='submit'
          onClick={() => vote(anecdote)} >vote</button>
      </div>
      <br />
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

export default Anecdote