import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = ({name}) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
      {
        parts.map(part => 
          <Part key={part.id}  part={part}/>
        )
      }
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce( (s, p) => {
      return (s + p)
    })
  
    return (
      <div>
        <p><b>Total of {total} exercises</b></p>
      </div>
    )
  }

export default Course  