import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { CURRENT_USER, FAVORITE_BOOKS } from './queries'

const App = () => {

  const client = useApolloClient()

  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [optedGenre, setGenre] = useState('all')
  const [getFavoriteBooks, resultBooks] = useLazyQuery(FAVORITE_BOOKS,) 
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const [getFavoriteGenre, resultUser] = useLazyQuery(CURRENT_USER) 
  const [favoriteGenre, setFavoriteGenre] = useState('')

  useEffect(() => {
    if (resultBooks.data && resultUser.data) {
      setFavoriteBooks(resultBooks.data.favorites)
      setFavoriteGenre(resultUser.data.me.favoriteGenre)
    }
  }, [resultBooks,resultUser])

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
              getFavoriteGenre()
              setPage('recommended')
            }} id='recommends'>
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

      {page === 'recommended' && favoriteBooks.length > 0 &&
        <Recommended
          show={page === 'recommended'}
          favoriteBooks={favoriteBooks}
          favoriteGenre={favoriteGenre}
        />
      }

      {page === 'recommended' && favoriteBooks.length === 0 &&
        <div><br />no recommended books</div>
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
        />
      }

    </div>
  )
}

export default App
