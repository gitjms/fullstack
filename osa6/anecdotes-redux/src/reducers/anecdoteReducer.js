const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      id: getId(),
      content,
      votes: 0
    }
  }
}

export const voteOf = (id, votes) => {
  return {
    type: 'VOTE',
    data: { id, votes }
  }
}

const initialState = anecdotesAtStart.map(anecdote => createAnecdote(anecdote))

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.data.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange,
        data: {
          id: id,
          content: anecdoteToChange.data.content,
          votes: action.data.votes + 1
        }
      }
      return state.map(anecdote =>
        anecdote.data.id !== id ? anecdote : changedAnecdote 
      )
    default:
      return state
  }
}

export default anecdoteReducer