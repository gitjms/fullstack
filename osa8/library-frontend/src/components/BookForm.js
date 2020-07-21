import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { NEW_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const BookForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(NEW_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onError: (error) => {
      props.notifyError(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.toString())
    },
    addBook: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = props.client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      props.client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
    props.setupdateCache(addedBook)
  }

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    if (title !== '' && author !== '' && published !== '') {
      addBook({ variables: { title,author,published: Number(published),genres } })
      console.log('add book...')

      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const width = {
    width: '100px'
  }

  return (
    <div className='col-auto'>
    <br />
    <h2>add books</h2>
      <form onSubmit={submit}>
        <div className='form-group'>
          <label style={width}>title:</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='form-group'>
          <label style={width}>author:</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='form-group'>
          <label style={width}>published:</label>
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button className='btn btn-primary' onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button className='btn btn-primary' type='submit'>create book</button>
      </form>
    </div>
  )
}

export default BookForm
