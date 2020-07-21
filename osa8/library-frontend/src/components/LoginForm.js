import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.notifyError(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.toString())
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    await login({  username, password })

    props.setPage('authors')
  }

  const width = {
    width: '100px'
  }
  
  return (
    <div className='col-auto'>
      <br />
      <form onSubmit={submit}>
        <div className='form-group'>
          <label style={width}>username:</label>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='form-group'>
          <label style={width}>password:</label>
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className='btn btn-primary' type='submit'>login</button>
        <button className='btn btn-primary' type='button' onClick={() => props.setPage('authors')}>cancel</button>
      </form>
    </div>
  )
}

export default LoginForm
