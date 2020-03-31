import React, { useState, useEffect  } from 'react'
import axios from 'axios'

const Country = ({countryToShow}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [ wheather, setWheather] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.weatherstack.com/current?access_key = ${api_key} & query = ${countryToShow.name}`).then(response => {
        setWheather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{countryToShow.name} </h1>
      <p>capital {countryToShow.capital} <br/>
         population {countryToShow.population}</p>
      <h3>languages</h3>
      <ul>
      {
        countryToShow.languages.map(language => <li key={language.name}>{language.name}</li>) 
      }
      </ul>
      <img src={countryToShow.flag} width="150" height="100" alt="flag"/>
      <h3>Weather in {countryToShow.capital}</h3>
        temperature {wheather.current.temperature}
        {wheather.weather_icons}
        wind {wheather.current.wind_speed}
    </div>
  )
}    

export default Country