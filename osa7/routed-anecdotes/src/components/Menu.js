import React, { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'
import About from './About'
import Anecdotes from './Anecdotes'
import CreateNew from './AnecdoteForm'
import Anecdote from './Anecdote'
import Notification from './Notification'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const Menu = () => {

  const [ anecdotes, setAnecdotes ] = useState([])
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(initialAnecdotes => {
        setAnecdotes(initialAnecdotes)
      })
  }, [])

  console.log(anecdotes)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote  ${anecdote} created!`)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <>
    <Notification notification={notification} />
    <Router>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote
            anecdotes={anecdotes}
            setAnecdotes={setAnecdotes} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <Anecdotes anecdotes={anecdotes} />
        </Route>
      </Switch>
    </Router>
    </>
  )
}




export default Menu