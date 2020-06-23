import React from 'react'

const Filter = ({setNameToFind,nameToFind,handleFindNameChange}) => {
    return (
        <form onChange={setNameToFind}>
            <div align="left">
                <label for="filter">filter shown with:</label>
                <input id="filter" type="text" class="form-control"
                    value={nameToFind}
                    onChange={handleFindNameChange}
                />
            </div>
        </form>
    )
}

export default Filter