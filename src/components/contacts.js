
const Persons = (props) => {
    return (
      <div>
        {props.filteredPersons.map(person => 
          ( <div className="phone_book" key={person.name}>{person.name} {person.number} 
          <button onClick={() =>props.deletePerson(person.id)}>delete</button></div>))}
      </div>
    )
  }

  export default Persons