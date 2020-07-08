import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Anecdote from './Anecdote'

const Anecdotes = ({ anecdotes }) => {

  return (
    <div>
    <h2>Anecdotes</h2>
    <Router>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </Link>
          </li>
        )}
      </ul>

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
      </Switch>
    </Router>
  </div>
  )
}

export default Anecdotes