import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <>
      <nav id='nav' className='navbar navbar-light'>
        <div className="d-flex justify-content-between">
        <div><b className='navbar-brand'>Anecdotes</b></div>
        <div><AnecdoteForm /></div>
        </div>
      </nav>
      <Notification />
      <Filter />
      <AnecdoteList />
      <Footer />
      <br />
    </>
  )
}

export default App