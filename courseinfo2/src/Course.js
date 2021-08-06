import React from 'react'

const Header = ({name}) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
    
  }
  
  const Content = ({parts}) => {
    console.log(parts)
    return (
      <div>
        {parts.map(part => 
          <Part part={part.name} exercises= {part.exercises} key={part.id}/>
          )}
      </div>
    )
  }
  
  const Part = ({part, exercises}) => {
    return (
      <div>
        Part: {part}
        <br/>
        Exercise: {exercises}
        <br/> 
        -----
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <b>Total exercises: {total}</b>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </div>
    )
   
  }
  
export default Course