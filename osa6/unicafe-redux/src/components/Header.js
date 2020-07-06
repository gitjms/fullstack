import React from 'react'

const Header = (props) => {
    return (
        <div className='col-auto'>
            <b>{props.header}</b>
        </div>
    )
}

export default Header