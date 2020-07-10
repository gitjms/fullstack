import React, { useState } from 'react'
import About from './About'
import Anecdotes from './Anecdotes'
import CreateNew from './AnecdoteForm'
import Notification from './Notification'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

const Menu = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [ notification, setNotification ] = useState(null)
  const [ visible, setVisible ] = useState(false)
  const [ fromCreate, setFromCreate ] = useState(true)

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