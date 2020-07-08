import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Anecdote from './Anecdote'

const Anecdotes = ({ props }) => {

  return (
    <div>
    <h2>Anecdotes</h2>
    <Router>
      <ul>
        {props.anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </Link>
          </li>
        )}
      </ul>

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote props={ props } />
        </Route>
      </Switch>
    </Router>
  </div>
  )
}

export default Anecdotes