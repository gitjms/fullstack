import React, { useRef } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthyearForm from './BirthyearForm'
import Togglable from './Togglable'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const birthyearFormRef = useRef()

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  let authors = []
  if (result.data) {
    authors = result.data.allAuthors
  }

  const setBirthyear = () => (
    <Togglable buttonLabel='Set birthyear' closeLabel='close' ref={birthyearFormRef}>
      <BirthyearForm
        authors={authors}
        setError={props.notifyError}
      />
    </Togglable>
  )

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br />
      {props.token &&
        <div>
          {setBirthyear()}
        </div>
      }
    </>
  )
}

export default Authors
