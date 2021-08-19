import React from 'react'
import contactService from '../services/contacts'

const removeContact = (name, id, setShowSearch, setPersons, persons, setErrorMessage) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)){
        contactService
            .remove(id)
            .then(updatedContacts => {
                setShowSearch(persons.filter(person => person.id !== id))
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                setErrorMessage(`unable to update, ${name} already was deleted`)
                setTimeout(() => {
                  setErrorMessage(null)
                  window.location.reload()
                  }, 4000)
              })
    }
    
}

const Numbers = ({person, setShowSearch, setPersons, persons, setErrorMessage}) => {

    return (
      <div>
        {person.id}- {person.name}: {person.number}    
        <button onClick={() => removeContact(person.name, person.id, setShowSearch, setPersons, persons, setErrorMessage)}>Delete</button>
      </div>
    )
  }

const Display = ({showSearch, setShowSearch, setPersons, persons, setErrorMessage}) => {

    return(
        <div>
            <h2>Numbers</h2>
            {showSearch.map(person => <Numbers key={person.id} person={person} setShowSearch = {setShowSearch} setPersons = {setPersons} persons = {persons} setErrorMessage = {setErrorMessage}/>)} 
        </div>
    )

}

export default Display