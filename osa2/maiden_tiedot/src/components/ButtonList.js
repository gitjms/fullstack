import React from 'react'

const ButtonList = ({country,setCountries}) => {

    const handleCountryButtonPress = () => {
        setCountries([].concat(country))
    }

    return (
        <>
            <div key={country.name} >
            {country.name} 
            <button
                style={{marginLeft: "5px"}}
                onClick={handleCountryButtonPress}
            >
            show 
            </button>
            </div>
        </>
    )
}

export default ButtonList
