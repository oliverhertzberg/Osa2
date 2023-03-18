export const ErrorNotification = ({message}) => {
    if(!message) {
      return null
    }
    return(
      <div className="error">{message}</div>
    )
  }
 

export const SuccessNotification = ({message}) => {
    if(!message) {
      return null
    }
    return(
      <div className="success">{message}</div>
    )
  }


export const EditNotification = ({message}) => {
    if(!message) {
      return null
    }
    return(
      <div className="edit"> {message} </div>
    )
  }

