import Alert from 'react-bootstrap/Alert'

/* 
This component is the core of our message alert system
It recieves the message type, the actual message, 
and a flag that specifies wheter or not the message should be rendered
*/
const Message = ({ type, message, showMessage }) => {
  return (
    <>
      {showMessage
        ? <Alert key={type} variant={type}>
          {message}
        </Alert>
        : null}
    </>
  )
}

export default Message
