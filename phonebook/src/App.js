import './App.css';
import React, { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import PersonForm from './components/PersonForm'
import Display from './components/Display'
import contactService from './services/contacts'

const Message = ({message}) => {
  if (message === null){
    return (
      <div></div>
    )
  }
    return (
      <div className = 'message'>
        {message}
      </div>
    )
  }

const Error = ({errorMessage}) => {
  if (errorMessage === null){
    return(
      <div></div>
    )
  }
  
  return (
    <div className = 'error'>
      {errorMessage}
    </div>
  )
}
  
  

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState([])
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
        setShowSearch(initialContacts)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    // Checks for existing person.name then adds new obj
    let exists = persons.findIndex(function(person,index){
      if(person.name.toUpperCase() === newName.toUpperCase()){
        return true;
      }
      return false;
    })
    if (exists !== -1){
      if(window.confirm(`${newName} already exists, would you like to update their number?`)){
        const person = persons.find(i => i.name.toUpperCase() === newName.toUpperCase() )
        const personID = person.id
        const changedContact = {...person, number: newNumber }

        contactService
          .update(personID, changedContact)
          .then(returnedContact => {
            setPersons(persons.map(person => person.id === personID ? changedContact : person))
            setShowSearch(persons.map(person => person.id === personID ? changedContact : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage('unable to update!')
            setTimeout(() => {
              setErrorMessage(null)
              window.location.reload()
              }, 4000)
          })
      }
      else{
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      contactService
        .create(personObject)
        .then(updatedContacts => {
          setPersons(persons.concat(updatedContacts))
          setShowSearch(persons.concat(updatedContacts))
          setNewNumber('')
          setNewName('')
          setMessage(
            `${newName} has been added!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(error => {
          setErrorMessage('unable to add!')
          setTimeout(() => {
            setErrorMessage(null)
            window.location.reload()
            }, 4000)
        })    
    }
  }

  // Handles state updates in INPUT
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
    let temp = event.target.value
    function exists(person){
      if (person.name.toUpperCase().search(temp.toUpperCase()) !== -1){
        return true
      }
    }
    setShowSearch(persons.filter(person => exists(person)))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message = {message}/>
      <Error errorMessage = {errorMessage}/>
      <SearchForm newSearch = {newSearch} handleNewSearch = {handleNewSearch}/>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNewName = {handleNewName} newNumber = {newNumber} handleNewNumber = {handleNewNumber}/>
      <Display showSearch = {showSearch} persons = {persons} setShowSearch = {setShowSearch} setPersons = {setPersons} setErrorMessage = {setErrorMessage} />
    </div>
  )
}

export default App