import React from 'react'
import Country from './Country'

const CountriesList = ({countriesToShow, handleShowClick}) => {

  return (
    (countriesToShow !== null && countriesToShow.lenght === 1) ? <Country countriesToShow={countriesToShow}/> : 
    <ul>
    {
      countriesToShow.map(country => <li key={country.name}>{country.name} <button onClick={() => {
          return handleShowClick(country)
      }}>show</button> </li>) 
    }
    </ul>
  )
}    

export default CountriesList
