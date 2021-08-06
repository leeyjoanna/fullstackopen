import React from 'react'
import Course from './Course'



const App = () => {
  const courses = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  },
  {
    id: 2,
    name: 'Node.js',
    parts: [
      {
        name: 'Routing',
        exercises: 12,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 5,
        id: 2
      },
      {
        name: 'Etc...',
        exercises: 1,
        id: 3
      },
    ]
  }
]
  
  return courses.map(course => <Course course={course} key={course.id}/>)
}

export default App