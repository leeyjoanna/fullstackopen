import React from 'react'
import Numbers from './Numbers'

const Display = ({showSearch}) => {

    return(
        <div>
            <h2>Numbers</h2>
            {showSearch.map(person => <Numbers key={person.id} person={person} />)} 
        </div>
    )

}

export default Display