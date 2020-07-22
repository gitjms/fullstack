import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useLazyQuery, useSubscription } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Footer from './components/Footer'
import { Notify, NotifyError } from './components/Notification'
import LoginForm from './components/LoginForm'
import UserForm from './components/UserForm'
import Recommended from './components/Recommended'
import { ALL_BOOKS, FAVORITE_BOOKS, BOOK_ADDED, CURRENT_USER } from './queries'

const App = () => {

  const client = useApolloClient()
  const allBooksResult = useQuery(ALL_BOOKS)

  const [allBooks, setAllBooks] = useState([])

  const [token, setToken] = useState(localStorage.getItem('library-user-token'))

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const [getFavoriteBooks, resultBooks] = useLazyQuery(FAVORITE_BOOKS) 
  const [favoriteBooks, setFavoriteBooks] = useState([])

  const [getUser, resultUser] = useLazyQuery(CURRENT_USER)
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const [optedGenre, setGenre] = useState('all')

  useEffect(() => {
    if (allBooksResult.data) {
      setAllBooks(allBooksResult.data.allBooks)
    }
  }, [allBooksResult])

  useEffect(() => {
    if (resultUser.data) {
      setFavoriteGenre(resultUser.data.me.favoriteGenre)
    }
  }, [resultUser])

  useEffect(() => {
    if (resultBooks.data ) {
      setFavoriteBooks(resultBooks.data.favorites)
    }
  }, [resultBooks])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      console.log(subscriptionData)
      notify(`${addedBook.title} added`)
    }
  })

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const notifyError = (errorMessage) => {
    setErrorMessage(errorMessage)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (allBooksResult.loading)  {
    return <div>loading...</div>
  }

  const padding = {
    paddingRight: '5px'
  }

  return (
    <>
      <nav id='nav' className='navbar navbar-light bg-light'>
        <a className="navbar-brand" href='/'
          data-toggle='tooltip' data-placement='top' title='Bloglist home' aria-label='Bloglist home'>
          <span style={padding}></span><FontAwesomeIcon icon={faHome}/><strong>Bloglist</strong></a>
        <div className='button-group'>
          <button className='btn btn-primary' onClick={() => setPage('authors')}
            data-toggle='tooltip' data-placement='top' title='authors' aria-label='authors'>
            authors
          </button>
          <button className='btn btn-primary' onClick={() => setPage('books')}
            data-toggle='tooltip' data-placement='top' title='books' aria-label='books'>
            books
          </button>
          {token &&
            <>
              <button className='btn btn-primary' onClick={() => setPage('addBook')}
                data-toggle='tooltip' data-placement='top' title='add book' aria-label='add book'>
                add book
              </button>
              <button className='btn btn-primary' onClick={() => {
                getUser()
                getFavoriteBooks()
                setPage('recommended')
              }}
              data-toggle='tooltip' data-placement='top' title='recommended' aria-label='recommended'>
                recommended
              </button>
            </>
          }
          {!token
            ? <><button className='btn btn-primary' onClick={() => setPage('login')}
                data-toggle='tooltip' data-placement='top' title='sign in' aria-label='sign in'>
                sign in<span style={padding}></span><FontAwesomeIcon icon={faSignInAlt}/>
              </button>
              <button className='btn btn-primary' onClick={() => setPage('createacc')}
                data-toggle='tooltip' data-placement='top' title='sign up' aria-label='sign up'>
                sign up<span style={padding}></span><FontAwesomeIcon icon={faUserPlus}/>
              </button></>
            : <button className='btn btn-primary' onClick={logout}
                data-toggle='tooltip' data-placement='top' title='sign out' aria-label='sign out'>
                sign out<span style={padding}></span><FontAwesomeIcon icon={faSignOutAlt}/></button>
          }
        </div>
      </nav>

      <div className='container'>
      <Notify message={message} />
      <NotifyError errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        notifyError={notifyError}
        notify={notify}
        token={token}
      />

      <Books
        show={page === 'books'}
        optedGenre={optedGenre}
        setGenre={setGenre}
        client={client}
        allBooks={allBooks}
      />

      {page === 'recommended' && favoriteBooks.length > 0 &&
        <Recommended
          show={page === 'recommended'}
          favoriteBooks={favoriteBooks}
          favoriteGenre={favoriteGenre}
        />
      }

      {page === 'recommended' && favoriteBooks.length === 0 &&
        <div><br />loading...</div>
      }

      {page === 'addBook' &&
        <BookForm
          show={page === 'addBook'}
          setPage={setPage}
          notify={notify}
          notifyError={notifyError}
          client={client}
          updateCacheWith={updateCacheWith}
        />
      }

      {page === 'login' &&
        <LoginForm
          setToken={setToken}
          notifyError={notifyError}
          setPage={setPage}
        />
      }

      {page === 'createacc' &&
        <UserForm
          setToken={setToken}
          notifyError={notifyError}
          setPage={setPage}
        />
      }

      <Footer /><br />

    </div>
    </>
  )
}

export default App
