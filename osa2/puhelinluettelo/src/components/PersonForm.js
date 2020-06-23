import React from 'react'

const PersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange,replaceNumber}) => {
    return (
        <div class="col-auto">
        <form onSubmit={addPerson}>
            <div align="left" class="form-group">
                <label for="name">name:</label>
                <input id="name" type="text" class="form-control"
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div align="left" class="form-group">
                <label for="number">number:</label>
                <input id="number" type="text" class="form-control"
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div align="left" class="form-group">
                <button class="btn btn-primary"
                    type="submit"
                    onClick={replaceNumber}
                >
                add
                </button>
            </div>
        </form>
        </div>
    )
}

export default PersonForm
