import React from 'react'
import { useParams } from 'react-router-dom'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ props }) => {

  const id = useParams().id

  const anecdote = props.anecdotes.find(n => n.id === id)

  const vote = (anecdote) => {
    const changedAnecdote = {
      content: anecdote.content,
      author: anecdote.author,
      info: anecdote.info,
      votes: anecdote.votes + 1
    }

    anecdoteService
      .update(anecdote.id, changedAnecdote)
      .then(returnedAnecdote => {
        props.setAnecdotes(props.anecdotes.map(
          oldanecdote => oldanecdote.id !== anecdote.id
            ? oldanecdote
            : returnedAnecdote
        ))
      })
      .catch(error => {
        props.setNotification(`${error}`)
        setTimeout(() => {
          props.setNotification(null)
        }, 4000)
        props.setAnecdotes(props.anecdotes.filter(n => n.id !== anecdote.id))
      })

    console.log('votes: ',anecdote.votes)
    props.anecdotes.map(a => a.id === id ? anecdote : a)
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}</div>
      <div>{anecdote.info}</div>
      <div>
        votes: {anecdote.votes}
        <button type='submit'
          onClick={() => vote(anecdote)} >vote</button>
      </div>
    </div>
  )
}

export default Anecdote