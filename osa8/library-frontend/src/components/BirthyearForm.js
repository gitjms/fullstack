import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthyearForm = (props) => {

  const options = props.authors.map( a => {
    return {
      value: a.name,
      label: a.name
    }
  })

  const [author, setAuthor] = useState('')
  const [born, setBirthyear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.toString())
    },
    update: (store, response) => {
      const authorsInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...authorsInStore,
          allAuthors: [ ...authorsInStore.allAuthors, response.data.editAuthor ]
        }
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (author !== '' && born !== '') {
      editAuthor({ variables: { name: author, setBornTo: Number(born) } })

      setBirthyear('')
      setAuthor('')
    }
  }

  const authorChange = (val) => {
    setAuthor(val.value)
  }

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            value={author.value}
            options={options}
            onChange={authorChange}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBirthyear(target.value)}
          />
          <button type='submit'>update author</button>
        </div>
      </form>
    </div>
  )
}

export default BirthyearForm
