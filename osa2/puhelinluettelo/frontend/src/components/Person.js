import React from 'react'

const Person = ({values,deletePerson}) => {

  return (
    <div className='list-group'>
      <li className='list-group-item list-group-item-action'>
        {values.name}
        <span style={{margin: '5px'}} />
        {values.number}
        <button type='button' className='btn btn-warning' id='listbtn' style={{marginLeft: '5px'}} onClick={deletePerson}>delete</button>
      </li>
    </div>
  )
}

export default Person
