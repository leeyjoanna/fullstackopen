import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForm from './components/SearchForm'
import PersonForm from './components/PersonForm'
import Display from './components/Display'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setShowSearch(response.data)
      })
  }, [])

  console.log('people', persons)
  console.log('show', showSearch)

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