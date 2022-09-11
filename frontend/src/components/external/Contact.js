import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { sendMailAxios } from '../../axios/mail'
import { alertMessage } from '../../utils'

const messageMilliseconds = 3000

function Contact() {
  const [showMessage, setShowMessage] = useState()
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState({})
  const [formData, setFormData] = useState()

  const handleShowMessage = (type, message) => {
    setShowMessage(true)
    setMessage({ type, message })
    setTimeout(() => setShowMessage(false), messageMilliseconds)
  }

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleOnSubmit = (e) => {
    const form = e.currentTarget

    // Validates the form
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
      return
    }
    e.preventDefault()

    setValidated(true)

    // Tries to send the email
    try {
      sendMailAxios(formData.content.concat(`\n\nFrom ${formData.email}`))
      handleShowMessage('success', "Message sent! I'll get back to you as soon as I can!")
    } catch (err) {
      setShowMessage(alertMessage('danger', err.message, 3000))
    }

    e.target.reset() // Form clean up
    setValidated(false)
  }

  return (
    <>
      <div className='dyn-height' style={{ position: 'relative' }}>
        <h2 className='subtitle'>Let's get in touch!</h2>
        <p className='paragraph'>
          Feel free to contact me for everything tech-related
        </p>
        {alertMessage(message.type, message.message, showMessage)}
        <div className='paragraphDiv'>
          <Form className='grey-text' noValidate validated={validated} onSubmit={handleOnSubmit}>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleOnChange} name='email' required type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Message</Form.Label>
              <Form.Control name='content' onChange={handleOnChange} required as='textarea' rows={10} placeholder='Write a message' />
            </Form.Group>
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </div>

          </Form>
        </div>
      </div>
    </>
  )
}

export default Contact
