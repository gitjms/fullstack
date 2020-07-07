import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

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