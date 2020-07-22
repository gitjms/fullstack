import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthyearForm = (props) => {

  const Scroll = require('react-scroll')
  const scroller = Scroll.animateScroll

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
    editAuthor: (store, response) => {
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
      props.notify(`author ${author} modified`)

      setBirthyear('')
      setAuthor('')
      scroller.scrollToTop()
    }
  }

  const authorChange = (val) => {
    setAuthor(val.value)
  }

  const width = {
    width: '50px'
  }

  return (
    <div>
      <br />
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            value={author.value}
            options={options}
            onChange={authorChange}
          />
        </div>
        <br />
        <div className='form-group'>
          <label style={width}>born:</label>
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBirthyear(target.value)}
            data-toggle='tooltip' data-placement='top' title='set birthyear' aria-label='set birthyear'
          />
          <button className='btn btn-primary' type='submit'
            data-toggle='tooltip' data-placement='top' title='update author' aria-label='update author'>
            update author
          </button>
        </div>
      </form>
    </div>
  )
}

export default BirthyearForm