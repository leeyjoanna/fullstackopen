import React, { useState} from 'react'
import EntryDetailed from './EntryDetailed'

const Entry = ({country}) => {
    const [ show, setShow ] = useState(false)

    const showDetails = show
        ? country
        : ''

    
    return(
      <div>
        {country.name} <button onClick={() => setShow(!show)}>
            {show ? 'close' : 'show'}</button>
        <div>
        <EntryDetailed country = {showDetails}/>
        </div>
      </div>


    )
  }

export default Entry