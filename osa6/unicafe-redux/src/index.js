import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducers/reducer'
import Header from './components/Header'
import Footer from './components/Footer'
import Statistics from './components/Statistics'
import './index.css'


const store = createStore(reducer)

const App = () => {

  const good = () => {
    store.dispatch({ type: 'GOOD' })
  }
  const neutral = () => {
    store.dispatch({ type: 'OK' })
  }
  const bad = () => {
    store.dispatch({ type: 'BAD' })
  }
  const reset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div className='col-auto'>
      <Header header={'Give Feedback'} />
      <div class='btn-group' role='group'>
        <button className='btn btn-outline-success mr-2' onClick={good}>good</button> 
        <button className='btn btn-outline-secondary mr-2' onClick={neutral}>neutral</button> 
        <button className='btn btn-outline-danger mr-2' onClick={bad}>bad</button>
        <button className='btn btn-secondary' onClick={reset}>reset stats</button>
      </div>
      <Header header={'Statistics'} />
      <Statistics store={store.getState()} />
      <br></br>
      <Footer />
      <br />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
