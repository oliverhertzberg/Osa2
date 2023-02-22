

const Course = (props) => {
    console.log(props)
    const exerciseTotal = props.partsNameExe.reduce((initial, x) => initial + x.exercises, 0)

    const partsNameExe = props.partsNameExe.map((x) => x.name + " " + x.exercises + "<br>"+"<br>");

    return(
      <div>
        <h1>{props.course}</h1>
        <p dangerouslySetInnerHTML={{__html: partsNameExe.join('')}}></p>
        <p className="total">Total number of exercises: {exerciseTotal}</p>
      </div>
    )
  }

  export default Course