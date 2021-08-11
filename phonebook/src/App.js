import './App.css';
import React, { useState } from 'react'
import SearchForm from './components/SearchForm'
import PersonForm from './components/PersonForm'
import Display from './components/Display'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: '1'},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: '2' },
    { name: 'Dan Abramov', number: '12-43-234345', id: '3' },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: '4' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState(persons)


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
      alert(`${newName} already exists!`)
      setNewName('')
      setNewNumber('')
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setShowSearch(persons.concat(personObject))
      setNewNumber('')
      setNewName('')
      
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
      <SearchForm newSearch = {newSearch} handleNewSearch = {handleNewSearch}/>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNewName = {handleNewName} newNumber = {newNumber} handleNewNumber = {handleNewNumber}/>
      <Display showSearch = {showSearch}/>
    </div>
  )
}

export default App