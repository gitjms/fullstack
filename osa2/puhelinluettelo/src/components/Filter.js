import React from 'react'

const Filter = ({setNameToFind,nameToFind,handleFindNameChange}) => {
    return (
        <form onChange={setNameToFind}>
            <div align="left">
                filter shown with:
                <input
                    value={nameToFind}
                    onChange={handleFindNameChange}
                />
            </div>
        </form>
    )
}

export default Filter