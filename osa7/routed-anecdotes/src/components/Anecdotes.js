import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Anecdote from './Anecdote'

const Anecdotes = ({ props }) => {

  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible}>
        <h2>Anecdotes</h2>
        <ul>
          {props.anecdotes.map(anecdote =>
            <li key={anecdote.id}>
              <Link
                to={`/anecdotes/${anecdote.id}`}
                onClick={() => {
                  props.setVisible(true)
                  props.history.push('/')
                }}>
                {anecdote.content}
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div style={showWhenVisible}>
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote props={ props } />
          </Route>
        </Switch>
    </div>
  </>
  )
}

export default Anecdotes