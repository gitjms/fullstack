import React from 'react'

const Filter = ({setCountryToFind,countryToFind,handleFindCountryChange}) => {
    return (
        <>
            <form onChange={setCountryToFind}>
                <div>
                    find countries:
                    <input style={{marginLeft: 5}} autoFocus
                        value={countryToFind}
                        onChange={handleFindCountryChange}
                    />
                </div>
            </form>
        </>
    )
}

export default Filter