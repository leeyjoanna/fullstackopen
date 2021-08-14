import React from 'react'
import Language from './Language'
import Weather from './Weather'

const EntryDetailed = ({country}) => {
  if (country === '') {
    return(
      <div></div>
    )
  }
    return(
      <div>
        <h2>{country.name}</h2>
        Capital: {country.capital}<br/>
        Population: {country.population}
        <h4>Spoken Languages</h4>
        <ul>
          {country.languages.map((language, idx) => <Language name={language.name} key={idx}/>)}
        </ul>
        <img src={country.flag} alt='flag'/>

        <Weather capital = {country.capital}/>
      </div>
    )
  }

export default EntryDetailed