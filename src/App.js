import { useState, useEffect } from 'react';
import './index.css';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [query, setQuery] = useState('')

  
useEffect(() => {
  personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
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

  console.log("persons length:", persons.length)

  const addPerson = (e) => {
    e.preventDefault()
    const nameCheck = persons.map(person => person.name);
    const numCheck = persons.map(person => person.number);

    if (nameCheck.map(name => name.toLowerCase()).includes(newName.toLowerCase())) {
      if(window.confirm(`${newName} is already added to the phone book, would you like to replace the old number with the new one?`)){
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const updatedPerson = {...personToUpdate, number: newNum}
        personService
        .update(personToUpdate.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
          setNewName('')
          setNewNum('')
        })
        .catch(error => {
          console.log(error);
        })
      }
    } else if (numCheck.includes(newNum)) {
      alert(`The number "${newNum}" is already in use, please type in another one.`)
    } else {
        personService
          .create({
            name: newName,
            number: newNum,
            id: persons.length + 1
          })
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNum('')
          })
          .catch(error => {
            console.log(error)
          })
    }
  }

  const deletePerson = (id) => {
    if (window.confirm(`Are you sure you want to delete ${persons.find(person => person.id === id).name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
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
        ( <div key={person.name}>{person.name} {person.number} 
        <button onClick={() =>props.deletePerson(person.id)}>delete</button></div>))}
    </div>
  )
}

export default App
