import React from 'react'

const PersonForm = ({handleNameChange, handleNumberChange, newName, newNumber, addPerson}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
        Name:  <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <button type="submit">save</button>
      </form>

    )

}    

export default PersonForm