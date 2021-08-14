import React from 'react'
import Entry from './Entry.js'
import EntryDetailed from './EntryDetailed'



const Results = ({selectCountries}) => {
    if (selectCountries.length > 10){
      return (
        <div>
          <h3>Results: </h3>
          Too many results ({selectCountries.length})
        </div>
      )
    }
    if (selectCountries.length === 1){
      return(
        <div>
          <h3>Results: </h3>
          <EntryDetailed country={selectCountries[0]}/>
        </div>
      )
    }
    if (selectCountries.length === 0){
      return(
        <div>
          <h3>Results: </h3>
          No countries found
        </div>
      )
    }
    return(
      <div>
        <h3>Results: </h3>
        {selectCountries.map(country => <Entry country={country} key={country.numericCode}/>)}
      </div>
    )
  }

export default Results