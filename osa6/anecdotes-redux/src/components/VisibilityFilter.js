import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div id='radio'>
      <div className='form-check form-check-inline' id='radio-all'>
        <input type='radio' className='form-check-input mr-2' name='filter'
          onChange={() => dispatch(filterChange('ALL'))} />
        <label className='form-check-label' htmlFor='filter'>all</label>
      </div>
      <div className='form-check form-check-inline'>
        <input type='radio' className='form-check-input mr-2' name='filter'
          onChange={() => dispatch(filterChange('VOTED'))} />
          <label className='form-check-label' htmlFor='filter'>voted</label>
      </div>
      <div className='form-check form-check-inline'>
        <input type='radio' className='form-check-input mr-2' name='filter'
          onChange={() => dispatch(filterChange('UNVOTED'))} />
          <label className='form-check-label' htmlFor='filter'>unvoted</label>
      </div>
    </div>
  )
}

export default VisibilityFilter