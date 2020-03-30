import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList'
import Country from './components/Country'

const  App = () => {

  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('') 
  const [ countriesToShow, setCountriesToShow ] = useState([])


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleShowClick = (country) => {
    setCountriesToShow([country])
}

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setCountriesToShow(countries.filter((country) => {if (country.name.toLowerCase().includes(event.target.value.toLowerCase())){return true;} else {return false}}))
  }

  return (
    <div>
      <div>find countries 
        <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </div>  
      { 
        (countriesToShow !== null && countriesToShow.length > 10 ) ?  <p>Too many matches, specify another filter</p> :
        (countriesToShow !== null && countriesToShow.length === 1 ) ? <Country countryToShow={countriesToShow[0]}/> : <CountriesList countriesToShow={countriesToShow} handleShowClick={handleShowClick}/>
      } 
    </div>
  );
}

export default App;
