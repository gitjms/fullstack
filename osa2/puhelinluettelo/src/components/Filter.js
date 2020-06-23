import React from 'react'

const Filter = ({setNameToFind,nameToFind,handleFindNameChange}) => {
    return (
        <form onChange={setNameToFind}>
            <div align="left">
                <label htmlFor="filter">filter shown with:</label>
                <input id="filter" type="text" className="form-control"
                    value={nameToFind}
                    onChange={handleFindNameChange}
                />
            </div>
        </form>
    )
}

export default Filter