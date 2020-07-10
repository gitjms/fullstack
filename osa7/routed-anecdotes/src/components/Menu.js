import React, { useState } from 'react'
import About from './About'
import Anecdotes from './Anecdotes'
import CreateNew from './AnecdoteForm'
import Notification from './Notification'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

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

  const history = useHistory()

  const color = {
    color: 'white'
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand >Software anecdotes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={color} to='/' onClick={() => setVisible(false)} >anecdotes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={color} to='/create' onClick={() => setFromCreate(true)}>create new</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={color} to='/about'>about</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification notification={notification} />
      <br />

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
              history,
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