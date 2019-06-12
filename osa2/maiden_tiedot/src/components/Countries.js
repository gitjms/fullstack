import React from 'react'
import ButtonList from './ButtonList'
import OneCountry from './OneCountry'

const Countries = ({countries,showAsked,countryToFind,setCountries}) => {

    const countriesToShow = showAsked
        ? countries.filter(country => 
            country.name.toLowerCase()
            .includes(countryToFind.toLowerCase()))
        : []

    if (countriesToShow.length > 10) {
        return (
            <>
                <div>Too many matches, specify another filter</div>
            </>
        )
    } else if (countriesToShow.length === 1) {
        return (
            <>
                <div>
                    {countriesToShow.map(country =>
                        <OneCountry
                            key={country.name}
                            languages={country.languages}
                            values={country}
                        />
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div>
                    {countriesToShow.map(country =>
                        <ButtonList
                            key={country.name}
                            country={country}
                            setCountries={setCountries}
                        />
                    )} 
                </div>
            </>
        )
    }
}

export default Countries
