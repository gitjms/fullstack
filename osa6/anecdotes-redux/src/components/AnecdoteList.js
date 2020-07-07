import React from 'react'
import { connect } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

// presentational component
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

// container component
const Anecdotes = (props) => {
  return(
    <ul>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => {
            props.voteOf(anecdote)
            props.setNotification(`you voted '${anecdote.content}'`,5)
          }}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  if ( state.filter === 'ALL' ) {
    return { anecdotes: state.anecdotes.sort(compareVotes) }
  }
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
    .includes(state.filter.content.toLowerCase())).sort(compareVotes)
  }
}

const mapDispatchToProps = {
  voteOf,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)