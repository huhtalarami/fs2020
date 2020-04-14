import React from 'react'
import Person from './Person'

const Persons = ({persons, newFilter, deletePersonOf}) => {

  const filteredPersons  = persons.filter((person) => {if (person.name.toLowerCase().includes(newFilter.toLowerCase())){return true;} else {return false}})
    return (
      <ul>
      {
        filteredPersons.map(person => <Person key={person.id}  person={person} deletePerson={() =>deletePersonOf(person.id)} />)
      }
      </ul>
    )
}    

export default Persons