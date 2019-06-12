import React from 'react'

const Person = ({values,deletePerson}) => {

    return (
        <ul>
            {values.name}
            <span style={{margin: "5px"}} />
            {values.number}
            <button 
                style={{marginLeft: "5px"}}
                onClick={deletePerson}
            >
                delete
            </button>
        </ul>
    )
}

export default Person
