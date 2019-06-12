import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Language from './Language'

const OneCountry = ({values,languages}) => {

    const [ capitalWeather, setCapitalWeather ] = useState('')

    useEffect(() => {
        if (values.capital !== '') {
            axios
                .get('https://api.apixu.com/v1/current.json?key=7a1ec02eb69b4671aa992918190706&q='+values.capital)
                .then(response => {
                    setCapitalWeather(response.data.current)
                   })
        }
    }, [values.capital])

    return (
        <>
            <h1>{values.name}</h1>
            <div>capital {values.capital}</div>
            <div>population {values.population}</div>
            <h3>languages</h3>
            <div>
                {languages.map(language =>
                    <Language name={language.name} key={language.name} />
                )}
            </div>
            <br></br>
            <img
                src={values.flag}
                alt="Country Flag"
                style={{width: 100}}
            />
            <h3>Weather in {values.capital}</h3>
            <div>Temperature: {capitalWeather.temp_c}</div>
            { capitalWeather.condition && <img src={capitalWeather.condition.icon} alt=""/> }
            <div>Wind: {capitalWeather.wind_kph} kph {capitalWeather.wind_dir} </div>
        </>
    )
}

export default OneCountry
