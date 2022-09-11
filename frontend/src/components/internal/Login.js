import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { login } from '../../axios/user'
import { alertMessage } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'

const messageMilliseconds = 3000

function Login() {
  // Grabs AuthContext
  const { isLogged, setIsLogged } = useContext(AuthContext)

  // Variables and states to be used later
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState()
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState({})
  const [formData, setFormData] = useState()

  // Controls the message component
  const handleShowMessage = (type, message) => {
    setShowMessage(true)
    setMessage({ type, message })
    setTimeout(() => setShowMessage(false), messageMilliseconds)
  }

  // Updates the form when user modifies it
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleOnSubmit = async (e) => {
    const form = e.currentTarget

    // Validate form fields
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
      return
    }
    e.preventDefault()

    setValidated(true)

    // Tries to log in user
    try {
      const data = await login(formData)
      localStorage.setItem('token', data.data.token)
      // Every axios request, from now on, will have the generated token on the Authorization header
      axios.defaults.headers.common.Authorization = localStorage.getItem('token')
      setIsLogged(true) // Sets the context state to true
      // Redirects to internal website
      navigate('/internal')
    } catch (err) {
      if (err.response.status == 401) {
        const message = err.response.data.msg
        console.error(message)
        handleShowMessage('danger', message)
      } else {
        handleShowMessage('danger', err.message)
      }
    }

    e.target.reset()
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
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' onChange={handleOnChange} type='password' required placeholder='Enter your password' />
            </Form.Group>
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <Button variant='primary' type='submit'>
                Log in
              </Button>
            </div>

          </Form>
        </div>
      </div>
    </>
  )
}

export default Login
