import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, votes, handleClick }) => {
  return(
    <div>
      <li className='list-group-item'>
        <em>{anecdote}</em>
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

function compareNumbers(a, b) {
  return b.data.votes - a.data.votes
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === 'ALL' ) {
      return anecdotes.sort(compareNumbers)
    }
    if ( filter === 'FILTERED' ) {
      return anecdotes.filter(anecdote => anecdote.data.content.toLowerCase()
        .includes(filter.filter.toLowerCase())).sort(compareNumbers)
    }
  })

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.data.id}
          id={anecdote.data.id}
          anecdote={anecdote.data.content}
          votes={anecdote.data.votes}
          handleClick={() => {
            dispatch(voteOf(anecdote.data.id,anecdote.data.votes))
            const text = 'you voted \''.concat(`${anecdote.data.content}`).concat('\'')
            dispatch(notificationChange('NOTIFICATION',text))
            setTimeout(() => {
              dispatch(notificationChange(null,null))
            }, 5000)
          }}
        />
      )}
    </ul>
  )
}

export default Anecdotes