import React from 'react'

const Persons = ({persons, newFilter}) => {
    const filteredPersons  = persons.filter((person) => {if (person.name.toLowerCase().includes(newFilter.toLowerCase())){return true;} else {return false}})
    return (
      <ul>
      {
        filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)
      }
      </ul>
    )
}    

export default Persons