import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Results from './components/Results'

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ selectCountries, setSelectCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setSelectCountries(response.data)
      })
  }, [])


  const handleSearch = (event) => {
    setSearch(event.target.value)
    let temp = event.target.value
    function search(countries){
      if (countries.name.toUpperCase().search(temp.toUpperCase()) !== -1){
        return true
      }
    }
    setSelectCountries(countries.filter(country => search(country)))
  }


  return (
    <div>
      <h1> Countries or something </h1>
      <div>
        Search: <input value={search} onChange={handleSearch}></input>
      </div>
      <div>
        <Results selectCountries={selectCountries}/>
      </div>
    </div>
  )
}


export default App;
