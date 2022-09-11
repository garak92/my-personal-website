import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { changePassword } from '../../axios/user'
import { alertMessage } from '../../utils'

const messageMilliseconds = 3000

function ChangePass() {
  // States and variables to be used later
  const [showMessage, setShowMessage] = useState()
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState({})
  const [formData, setFormData] = useState()

  // Controls message component
  const handleShowMessage = (type, message) => {
    setShowMessage(true)
    setMessage({ type, message })
    setTimeout(() => setShowMessage(false), messageMilliseconds)
  }

  // Updates formData when user modifies the form
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleOnSubmit = async (e) => {
    const form = e.currentTarget

    // Validates form
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
      return
    }
    e.preventDefault()

    setValidated(true)

    // Attemps to change the password
    try {
      const data = await changePassword(formData)
      handleShowMessage('success', 'Password changed successfully!')
    } catch (err) {
      const message = err.response.data.msg
      console.error(message)
      handleShowMessage('danger', message)
    }

    e.target.reset() // Form cleanup
    setValidated(false)
  }

  return (
    <>
      <div className='dyn-height' style={{ position: 'relative' }}>
        <h2 className='subtitle'>Internal website</h2>
        {alertMessage(message.type, message.message, showMessage)}
        <div className='paragraphDiv'>
          <Form className='grey-text' noValidate validated={validated} onSubmit={handleOnSubmit}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Current password</Form.Label>
              <Form.Control name='oldpassword' onChange={handleOnChange} type='password' required placeholder='Enter your current password' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>New password</Form.Label>
              <Form.Control name='newpassword' onChange={handleOnChange} type='password' required placeholder='Enter your new password' />
            </Form.Group>
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <Button variant='primary' type='submit'>
                Change password
              </Button>
            </div>

          </Form>
        </div>
      </div>
    </>
  )
}

export default ChangePass
