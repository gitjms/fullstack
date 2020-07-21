import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Button from './Button'

const Books = (props) => {

  const allbooks = useQuery(ALL_BOOKS)
  const dataInStore = props.client.readQuery({ query: ALL_BOOKS })
  const [getGenreBooks, resultBooks] = useLazyQuery(
    ALL_BOOKS, { variables: { genre: props.optedGenre } }
  ) 
  const [genreBooks, setGenreBooks] = useState([])

  useEffect(() => {
    if (resultBooks.data) {
      setGenreBooks(resultBooks.data.allBooks)
    }
  }, [resultBooks,props.optedGenre])

  useEffect(() => {
    if (props.optedGenre !== 'all') {
      getGenreBooks()
    }
  }, [getGenreBooks,props.optedGenre])

  if (!props.show) {
    return null
  }

  if (allbooks.loading)  {
    return <div>loading...</div>
  }

  let genres = []
  let booksToShow = []
  if (props.optedGenre !== 'all') {
    booksToShow = genreBooks
  } else if (allbooks.data) {
    props.updateCache === null
      ? booksToShow = allbooks.data.allBooks
      : booksToShow = dataInStore.allBooks.concat(props.updateCache)
    let genreItems = []
    booksToShow.map(b => b.genres.filter(g => genreItems.push(g)))
    genres = [...new Set(genreItems)]
  }

  const options = genres.map(genre => {
    return {
      value: genre,
      label: genre
    }
  })

  const genreChange = (val) => {
    props.setGenre(val.value)
  }

  const padding = {
    paddingRight: '10px'
  }

  return (
    <div>
      <br />
      <h2>books</h2>
      {props.optedGenre !== 'all' &&
        <>in genre <b>{props.optedGenre}</b><br /><br /></>
      }
      <table>
        <tbody>
          <tr>
            <th style={padding}></th>
            <th style={padding}>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map((b,v,i) =>
            <tr key={v}>
              <td style={padding}><em>{b.title}</em></td>
              <td style={padding}>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
            )
          }
        </tbody>
      </table><br />
      {genres.map((g,v,i) =>
          <Button genre={g} key={i.indexOf(g)} setGenre={props.setGenre} />
      )}
      <button type='button' className='btn btn-primary'
        onClick={() => props.setGenre('all')}
        id='genre-button'
        autoFocus
      >all genres
      </button>
      <br />
      <div>
      <br />
        <Select
          value={props.optedGenre}
          options={options}
          onChange={genreChange}
        />
      </div>
      <br />
    </div>
  )
}

export default Books
