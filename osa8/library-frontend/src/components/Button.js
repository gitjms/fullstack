import React from 'react'

const Button = (props) => {
  return(
    <button type='button' className='btn btn-primary'
      value={props.genre}
      onClick={() => {
        props.setGenre(props.genre)
      }}
      id='genre-button'
    >
    {props.genre}
    </button>
  )
}

export default Button