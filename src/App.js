import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import Personslist from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState(Personslist)
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [query, setQuery] = useState('')

  
useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}, [])

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    console.log(e.target.value)
    setNewNum(e.target.value)
  }
  
  const addPerson = (e) => {
    e.preventDefault()
    const nameCheck = persons.map(person => person.name);
    const numCheck = persons.map(person => person.number);

    if (nameCheck.includes(newName)) {
      alert(`The name "${newName}" is already in use, please type in another name.`)
    } else if (numCheck.includes(newNum)) {
      alert(`The number "${newNum}" is already in use, please type in another one.`)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNum,
      }))
      setNewName('')
      setNewNum('')
    }
  }

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(query.toLowerCase())
  })

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} setQuery={setQuery}/>

      <h2>add a new</h2>
      <Form addPerson={addPerson} handleNameChange={handleNameChange} 
      handleNumChange={handleNumChange} newName={newName} newNum={newNum} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

const Filter = (props) => {
    return(<div>
      filter shown with <input type="search" value={props.query}  onChange={e => props.setQuery(e.target.value)} />
    </div>)
}

const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNum} onChange={props.handleNumChange} />
        </div>
        <div>
          <button className='nappi' type='submit'>Add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.filteredPersons.map(person => 
        ( <div key={person.name}>{person.name} {person.number}</div>))}
    </div>
  )
}

export default App

/* effektifunktio esimerkki:
  useEffect(() => {
  console.log('effect')

  const eventHandler = response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)
}, []) 

const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')
  */