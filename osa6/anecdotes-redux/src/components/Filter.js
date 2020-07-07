import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    dispatch(filterChange('SET_FILTER',content))
  }

  const style = {
    marginTop: '10px'
  }

  return (
    <div className='col-auto' style={style}>
      <form onChange={handleChange}>
        <label htmlFor='filter'>filter</label>
        <input name='filter' type='text' className='form-control' />
      </form>
    </div>
  )
}

export default Filter