import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Button from './Button'

const Books = (props) => {

  const [getGenreBooks, resultBooks] = useLazyQuery(
    ALL_BOOKS, { variables: { genre: props.optedGenre } })
  const [genreBooks, setGenreBooks] = useState([])

  const [getAllBooks, resultAllBooks] = useLazyQuery(ALL_BOOKS)
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
    if (resultBooks.data) {
      setGenreBooks(resultBooks.data.allBooks)
    }
  }, [resultBooks,props.optedGenre])

  useEffect(() => {
    if (resultAllBooks.data) {
      setAllBooks(resultAllBooks.data.allBooks)
    }
  }, [resultAllBooks])

  useEffect(() => {
    if (props.optedGenre === 'all') {
      getAllBooks()
    } else {
      getGenreBooks()
    }
  }, [getGenreBooks,getAllBooks,props.optedGenre])

  if (!props.show) {
    return null
  }

  let booksToShow = []
  console.log('all',allBooks.lengt)
  console.log(' props.', props.allBooks.lengt)
  props.optedGenre === 'all'
    ? allBooks.lengt > props.allBooks.lengt
      ? booksToShow = allBooks
      : booksToShow = props.allBooks
    : booksToShow = genreBooks

  let genres = []
  let genreItems = []
  booksToShow.map(b => b.genres.filter(g => genreItems.push(g)))
  genres = [...new Set(genreItems)]

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

  const alignRight = {
    float: 'right'
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
            <th style={padding}
                data-toggle='tooltip' data-placement='top' title='author' aria-label='author'>
              author
            </th>
            <th data-toggle='tooltip' data-placement='top' title='published' aria-label='published'>
              published
            </th>
          </tr>
          {booksToShow.map((b,v,i) =>
            <tr key={v}>
              <td style={padding}
                data-toggle='tooltip' data-placement='top' title={b.title} aria-label={b.title}>
                <em>{b.title}</em>
              </td>
              <td style={padding}
                data-toggle='tooltip' data-placement='top' title={b.author.name} aria-label={b.author.name}>
                {b.author.name}
              </td>
              <td style={alignRight}
                data-toggle='tooltip' data-placement='top' title={b.published} aria-label={b.published}>
                {b.published}
              </td>
            </tr>
            )
          }
        </tbody>
      </table><br />
      {genres.map((g,v,i) =>
          <Button genre={g} key={i.indexOf(g)} setGenre={props.setGenre} />
      )}
      {props.optedGenre !== 'all' &&
        <button type='button' className='btn btn-primary'
          onClick={() => props.setGenre('all')}
          id='genre-button'
          data-toggle='tooltip' data-placement='top' title='all genres' aria-label='all genres'
        >all genres
        </button>
      }
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
