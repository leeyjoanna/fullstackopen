import React from 'react'

const Numbers = ({person}) => {
    return (
      <div>
        {person.id}- {person.name}: {person.number}
      </div>
    )
  }

export default Numbers