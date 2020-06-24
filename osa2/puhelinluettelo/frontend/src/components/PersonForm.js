import React from 'react'

const PersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange,replaceNumber}) => {
    return (
        <div className="col-auto">
        <form onSubmit={addPerson}>
            <div align="left" className="form-group">
                <label htmlFor="name">name:</label>
                <input id="name" type="text" className="form-control"
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div align="left" className="form-group">
                <label htmlFor="number">number:</label>
                <input id="number" type="text" className="form-control"
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div align="left" className="form-group">
                <button className="btn btn-primary"
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
