import React from 'react'

const Person = ({values,deletePerson}) => {

    return (
        <div class="list-group">
            <li class="list-group-item list-group-item-action">
                {values.name}
                <span style={{margin: "5px"}} />
                {values.number}
                <button type="button" class="btn btn-warning" id="listbtn"
                    style={{marginLeft: "5px"}}
                    onClick={deletePerson}
                >
                    delete
                </button>
            </li>
        </div>
    )
}

export default Person
