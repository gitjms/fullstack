import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ showAsked, setShowAsked ] = useState(false)
    const [ countryToFind, setShowCountryToFind ] = useState('')
    const [ countryNameChange, setCountryNameChange ] = useState(false)

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
                setCountryNameChange(true)
            })
    }, [])

    const handleFindCountryChange = (event) => {
        setShowCountryToFind(event.target.value)
    }

    const setCountryToFind = (countryToFind) => {
        if (countryToFind !==''){
            setShowAsked(true)
        }
    }

    const handleCountryNameChange = (values) => {
        if (countryNameChange === true){
            setCountries(values)
        }
    }

    return (
        <>
            <Filter
                setCountryToFind={setCountryToFind}
                countryToFind={countryToFind}
                handleFindCountryChange={handleFindCountryChange}
                countryNameChange={handleCountryNameChange}
            />
            <Countries
                countries={countries}
                showAsked={showAsked}
                countryToFind={countryToFind}   
                setCountries={setCountries} 
            />
        </>
    )
}

export default App
