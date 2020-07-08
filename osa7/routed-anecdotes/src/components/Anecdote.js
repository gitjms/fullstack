import React from 'react'
import { useParams } from 'react-router-dom'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ anecdotes }) => {

  // const [ notification, setNotification ] = useState(null)
  const id = useParams().id

  const anecdote = anecdotes.find(n => n.id === id)

  const vote = (anecdote) => {
    const changedAnecdote = {
      content: anecdote.content,
      author: anecdote.author,
      info: anecdote.info,
      votes: anecdote.votes + 1
    }

    anecdoteService
      .update(anecdote.id, changedAnecdote)
      // .then(returnedAnecdote => {
      //   setAnecdotes(anecdotes.map(
      //     oldanecdote => oldanecdote.id !== anecdote.id
      //       ? oldanecdote
      //       : returnedAnecdote
      //   ))
      // })
      // .catch(error => {
      //   setNotification(`${error}`)
      //   setTimeout(() => {
      //     setNotification(null)
      //   }, 4000)
      //   setAnecdotes(anecdotes.filter(n => n.id !== anecdote.id))
      // })

    console.log('votes: ',anecdote.votes)
    anecdotes.map(a => a.id === id ? anecdote : a)
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