import { useState, useEffect } from 'react';
import './index.css';
import personService from './services/persons'

import Persons from './components/contacts';
import { ErrorNotification, SuccessNotification, EditNotification } from './components/notifications';
import Filter from './components/contactfilter';
import Form from './components/form';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [query, setQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [editMessage, setEditMessage] = useState(null)

  
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
          setEditMessage(
            `Successfully edited contact ${returnedPerson.name}`
          )
          setTimeout(() => {
            setEditMessage(null)
        }, 5000)
        })
        .catch(error => {
          console.log(error);
          setErrorMessage(
            `${personToUpdate.name} was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== personToUpdate.id))
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
            setSuccessMessage(
              `Added ${returnedPerson.name}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
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
        setErrorMessage(
          `deleted ${persons.find(person => person.id === id).name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <h2>Phone book</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <EditNotification message={editMessage} />
      <Filter query={query} setQuery={setQuery}/>

      <h2>add a new</h2>
      <Form addPerson={addPerson} handleNameChange={handleNameChange} 
      handleNumChange={handleNumChange} newName={newName} newNum={newNum} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}


export default App
