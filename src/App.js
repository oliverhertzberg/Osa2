import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([{
    name: 'Arto Hellas',
  }])
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const addName = (e) => {
    console.log('button clicked')
    e.preventDefault()
    const nameCheck = persons.map(person => person.name);
      return nameCheck.includes(newName)
        ? alert(`The name "${newName}" is already in use, please type in another name.`)
        : (
          setPersons(persons.concat({
            name: newName,
          })),
          setNewName('')
        )
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit' onClick={addName}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}


export default App