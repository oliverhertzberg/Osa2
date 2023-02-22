import Course from "./components/Course"
import './index.css';
import DOMpurify from 'dompurify';


const App = () => {
  const courses = [
  {
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
}, 
{
  name: 'Node.js',
  id: 2,
  parts: [
    {
      name: 'routing',
      exercises: 3,
      id: 1
    },
    {
      name: 'Middlewares',
      exercises: 7,
      id: 2
    }
  ]
}
  ]
  console.log("courses:", courses[0].name)
  return (
   <div>
    <h1>Web development curriculum</h1>
    <Course course={courses[0].name} partsNameExe={courses[0].parts}/>
    <Course course={courses[1].name} partsNameExe={courses[1].parts}/>
  </div>
  )
    
  
}



export default App