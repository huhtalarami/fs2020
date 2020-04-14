import React, { useState, useEffect  } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/personService'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePersonOf = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) { 
      personService
      .deletePerson(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id  ))
        setActionMessage(
          `Deleted '${personToDelete.name}'`
        )
        setTimeout(() => {
          setActionMessage(null)
        }, 5000)

      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    
    if (names.indexOf(newName) >= 0){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { 
        const personToUpdate = persons.find(p => p.name === newName)
        const personObject = {
          name: newName,
          number: newNumber
        }  
      
        personService
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setActionMessage(
              `Updated '${newName}'`
            )
            setTimeout(() => {
              setActionMessage(null)
            }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information '${newName}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== personToUpdate.id))


        })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
    
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setActionMessage(
            `Added '${newName}'`
          )
          setTimeout(() => {
            setActionMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={actionMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter}/> 
    
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} addPerson={addPerson}/>

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter}  deletePersonOf={deletePersonOf}/>

    </div>
  )
}

export default App
