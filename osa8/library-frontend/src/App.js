import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { FAVORITE_BOOKS } from './queries'

const App = () => {

  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [optedGenre, setGenre] = useState('all')
  const client = useApolloClient()

  const [user, setUser] = useState(null)
  const [getFavoriteBooks, resultBooks] = useLazyQuery(FAVORITE_BOOKS) 
  const [favoriteBooks, setFavoriteBooks] = useState([])

  useEffect(() => {
    if (resultBooks.data) {
      setFavoriteBooks(resultBooks.data.favorites)
    }
  }, [resultBooks])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  console.log('favoriteBooks',favoriteBooks)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <>
            <button onClick={() => setPage('addBook')}>add book</button>
            <button onClick={() => {
              getFavoriteBooks()
              setPage('recommended')
            }}>
              recommended
            </button>
          </>
        }
        {!token
          ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={logout}>logout</button>
        }
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'} setError={notify} token={token}
      />

      <Books
        show={page === 'books'}
        optedGenre={optedGenre}
        setGenre={setGenre}
      />

      {user && favoriteBooks.length > 0 &&
        <Recommended
          show={page === 'recommended'}
          user={user}
          favoriteBooks={favoriteBooks}
        />
      }

      {page === 'addBook' &&
        <BookForm
          show={page === 'addBook'} setError={notify} setPage={setPage}
        />
      }

      {page === 'login' &&
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
          setUser={setUser}
        />
      }

    </div>
  )
}

export default App
