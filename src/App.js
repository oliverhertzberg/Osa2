import Course from "./components/Course"

const App = () => {
  const course = {
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
    {
      name: 'New part test',
      exercises: 4222,
      id: 4
    }
  ]
}
  console.log(course.parts[2])

  return <Course course={course.name} partsNameExe={course.parts}/>
    
  
}



export default App