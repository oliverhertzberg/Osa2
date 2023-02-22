import DOMPurify from "dompurify";


const Course = (props) => {
    console.log(props)
    const exerciseTotal = props.partsNameExe.reduce((initial, x) => initial + x.exercises, 0)

    const partsNameExe = props.partsNameExe.map((x) => x.name + " " + x.exercises + "<br>"+"<br>");

    return(
      <div>
        <h2>{props.course}</h2>  
        {/* Löysin dompurifyn youtuupista :D, toivottavasti toi on vähemmän vaarallinen */}  
        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(partsNameExe.join(''))}}></p>
        <p className="total">Total number of exercises: {exerciseTotal}</p>
      </div>
    )
  }


  export default Course