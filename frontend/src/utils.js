import Message from './components/common/Messages'

export const alertMessage = (type, message, showMessage) => {
  return <Message type={type} message={message} showMessage={showMessage} />
}
