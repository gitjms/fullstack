import React from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Button from './Button'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  let books = []
  let genres = []
  if (result.data) {
    books = result.data.allBooks
    let genreItems = []
    books.map(b => b.genres.filter(g => genreItems.push(g)))
    genres = [...new Set(genreItems)]
  }

  let booksToShow = []
  if (props.optedGenre !== 'all') {
    booksToShow = books.filter(b =>
      b.genres.includes(props.optedGenre)
    )
  } else {
    booksToShow = books
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

  return (
    <div>
      <h2>books</h2>
      {props.optedGenre !== 'all' &&
        <>in genre <b>{props.optedGenre}</b><br /><br /></>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map((b,v,i) =>
            <tr key={v}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
            )
          }
        </tbody>
      </table><br />
      {genres &&
        genres.map((g,v,i) =>
          <Button genre={g} key={i.indexOf(g)} setGenre={props.setGenre} />
      )}
      <button type='button'
        onClick={() => props.setGenre('all')}
        id='genre-button'
        autoFocus
      >all genres
      </button>
      <div>
        <Select
          value={props.optedGenre}
          options={options}
          onChange={genreChange}
        />
      </div>
    </div>
  )
}

export default Books
