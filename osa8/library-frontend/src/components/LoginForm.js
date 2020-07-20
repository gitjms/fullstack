import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN, CURRENT_USER } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    await login({ variables: { username, password } })

    props.setPage('authors')
  }

  const currentUser = useQuery(CURRENT_USER)
  props.setUser(currentUser)
  
  return (
    <div>
      <br />
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
        <button type='button' onClick={() => props.setPage('authors')}>cancel</button>
      </form>
    </div>
  )
}

export default LoginForm
