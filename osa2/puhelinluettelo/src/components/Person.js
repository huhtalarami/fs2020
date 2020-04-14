import React from 'react'

const Person = ({person, deletePerson}) => {

    return (
        <li key={person.name}>{person.name} {person.number}  <button onClick={deletePerson}>delete</button>  </li>
    )
}    

export default Person