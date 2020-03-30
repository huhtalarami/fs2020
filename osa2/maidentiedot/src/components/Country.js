import React from 'react'

const Country = ({countryToShow}) => {
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
    Always sunshine
    </div>
   )
}    

export default Country