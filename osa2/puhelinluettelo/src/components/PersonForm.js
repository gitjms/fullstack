import React from 'react'

const PersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange,replaceNumber}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name:
                <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number:
                <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button
                    type="submit"
                    onClick={replaceNumber}
                >
                add
            </button>
            </div>
        </form>
    )
}

export default PersonForm
