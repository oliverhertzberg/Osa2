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

  export default Form