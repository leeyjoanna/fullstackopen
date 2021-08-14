import React, {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({capital}) => {
    const [ temperature, setTemperature ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ feelsLike, setFeelsLike ] = useState('')
    const [ icon, setIcon ] = useState('')
    
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
            setTemperature(response.data.current.temperature)
            setDescription(response.data.current.weather_description)
            setFeelsLike(response.data.current.feelslike)
            setIcon(response.data.current.weather_icons)
            })
            .catch(error => {
                console.log('error!', error)
            })
    }, [capital])

    return(
        <div>
            <h4>Weather in {capital}</h4>
            <p/><b>Temperature: </b> {temperature} Celcius <em>{description}</em><br/>
            <p/><b>Feels like: </b> {feelsLike} Celcius <br/>
            <img src={icon} alt='weather icon'></img>
            <br/>--------------------------<br/>
        </div>
    )
}
export default Weather