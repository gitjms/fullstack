import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Language from './Language'

const OneCountry = ({values,languages}) => {
    
    const [ weather, setWeather ] = useState({})

    useEffect(() => {
        if (values.capital !== '') {
            const params = {
                access_key: process.env.REACT_APP_API_KEY,
                query: values.capital,
                units: 'm'
             }
            axios
                .get('http://api.weatherstack.com/current', {params})
                .then(response => {
                    return (
                        setWeather({
                            temperature: response.data.current.temperature,
                            icon: response.data.current.weather_icons,
                            wind_speed: response.data.current.wind_speed,
                            wind_dir: response.data.current.wind_dir
                        })

                    )
                })
        }
    }, [values.capital])

    return (
        <div>
            <h1>{values.name}</h1>
            <div>capital {values.capital}</div>
            <div>population {values.population}</div>
            <h2>languages</h2>
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
            <h2>Weather in {values.capital}</h2>
            <div>Temperature: {weather.temperature}&#8451;</div>
            { weather.weather_descriptions && <img src={weather.icon} alt=""/> }
            <div>Wind: {weather.wind_speed} kph {weather.wind_dir} </div>
        </div>
    )
}

export default OneCountry
