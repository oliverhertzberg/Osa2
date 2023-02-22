

const Course = (props) => {
    console.log(props)
    //using the <br> tags
    const partsNameExe = props.partsNameExe.map((x) => x.name + " " + x.exercises + "<br>"+"<br>");

    return(
      <div>
        <h1>{props.course}</h1>
        <p dangerouslySetInnerHTML={{__html: partsNameExe.join('')}}>
          
        </p>
      </div>
    )
  }

  export default Course