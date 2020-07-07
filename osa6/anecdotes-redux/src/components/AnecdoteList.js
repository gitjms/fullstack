import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

// presentational-komponentti
const Anecdote = ({ anecdote, votes, handleClick }) => {
  return(
    <div>
      <li className='list-group-item'>
        <em style={{fontWeight: '600'}}>{anecdote}</em>
      </li>
      <li className='list-group-item'>
        has {votes}
        <button type='button' className='btn btn-success' id='vote-button'
          onClick={handleClick}>vote</button>
      </li>
      <hr />
    </div>
  )
}

function compareVotes(a, b) {
  return b.votes - a.votes
}

// container-komponentti
const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === 'ALL' ) {
      return anecdotes.sort(compareVotes)
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase()
      .includes(filter.content.toLowerCase())).sort(compareVotes)
  })

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => {
            dispatch(voteOf(anecdote))
            dispatch(setNotification(`you voted '${anecdote.content}'`,5))
          }}
        />
      )}
    </ul>
  )
}

export default Anecdotes