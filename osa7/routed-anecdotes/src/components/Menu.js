import React, { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'
import About from './About'
import Anecdotes from './Anecdotes'
import CreateNew from './AnecdoteForm'
import Notification from './Notification'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

const Menu = () => {

  const [ anecdotes, setAnecdotes ] = useState([])
  const [ notification, setNotification ] = useState(null)
  const [ visible, setVisible ] = useState(false)
  const [ fromCreate, setFromCreate ] = useState(true)

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(initialAnecdotes => {
        setAnecdotes(initialAnecdotes)
      })
  }, [])

  const padding = {
    paddingRight: 5
  }

  return (
    <>
      <Notification notification={notification} />
      <div>
        <Link style={padding} to='/' onClick={() => setVisible(false)} >anecdotes</Link>
        <Link style={padding} to='/create' onClick={() => setFromCreate(true)}>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      <Switch>
        <Route path="/create">
          {fromCreate === true
            ? <CreateNew props={{ anecdotes,setAnecdotes,setNotification,setFromCreate }} />
            : <Redirect to="/"/>
          }
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <Anecdotes
            props={{
              visible,
              anecdotes,
              setAnecdotes,
              setNotification,
              setVisible }} />
        </Route>
      </Switch>
    </>
  )
}

export default Menu