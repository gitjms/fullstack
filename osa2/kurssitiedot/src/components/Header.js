import React from 'react'

const Header = ({name}) => {
    console.log('header: ',name)
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

export default Header
