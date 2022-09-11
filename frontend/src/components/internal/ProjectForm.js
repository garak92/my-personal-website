import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { createProjectAxios, editProjectAxios, getProjectIdAxios } from '../../axios/projects'
import { alertMessage } from '../../utils'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'

const messageMilliseconds = 3000 // How many millisecs will the messages last

const ProjectEditor = (props) => {
  // Variables and states to be used later
  const navigate = useNavigate()
  const { type } = props // Scpecifies if the form is on EDIT or ADD mode
  const { id } = useParams()
  const [showMessage, setShowMessage] = useState()
  const [validated, setValidated] = useState(false)
  const [currentRecord, setCurrentRecord] = useState()

  // Gets a single project by id
  const getDataId = async () => {
    try {
      const data = await getProjectIdAxios(id)
      setCurrentRecord(data.record)
      return data.record
    } catch (err) {
      console.error('Error: ', err.message)
      handleShowMessage('danger', err.message)
    }
  }

  const initialFormData = {
    name: '',
    description: '',
    link: '',
    source: ''
  }

  const [formData, updateFormData] = useState(initialFormData)
  const [message, setMessage] = useState({})

  // Updates formData whe user modifies the form
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }

  // Controls message component
  const handleShowMessage = (type, message) => {
    setShowMessage(true)
    setMessage({ type, message })
    setTimeout(() => setShowMessage(false), messageMilliseconds)
  }

  const handleOnSubmit = async (e) => {
    const form = e.currentTarget

    // Form input validation
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
      return
    }
    e.preventDefault()

    setValidated(true)

    // Tries to create a new project
    try {
      const data = type == 'ADD' ? await createProjectAxios(formData) : await editProjectAxios(formData, id)
      type == 'ADD' ? handleShowMessage('success', `Project "${data.data.name}" created successfully!`) : handleShowMessage('success', `${data.msg}!`)
    } catch (err) {
      console.error(err.message)
      handleShowMessage('danger', err.message)
    }

    e.target.reset() // Form cleanup
    setValidated(false)
  }

  // Populates form fields with record to be edited, but only if we are on EDIT mode
  useEffect(() => {
    if (type == 'EDIT') {
      getDataId()
      updateFormData(currentRecord)
    }
  }, [])

  return (
    <>
      <div className='form' style={{ position: 'relative' }}>
        <h2 className='subtitle'>{type == 'EDIT' ? 'Edit project' : 'Add new project'}</h2>
        {alertMessage(message.type, message.message, showMessage)}
        <div className='paragraphDiv'>
          <Form noValidate validated={validated} className='grey-text'>

            <Form.Group className='mb-3'>
              <Form.Label>Project name</Form.Label>
              <Form.Control name='name' defaultValue={currentRecord ? currentRecord.name : null} onChange={handleChange} required placeholder="Enter project's name" />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Project description</Form.Label>
              <Form.Control name='description' defaultValue={currentRecord ? currentRecord.description : null} onChange={handleChange} required as='textarea' rows={3} placeholder='Write a description' />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Project website</Form.Label>
              <Form.Control name='link' defaultValue={currentRecord ? currentRecord.link : null} onChange={handleChange} required placeholder="Url to the project's website" />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Link to source code</Form.Label>
              <Form.Control name='source' defaultValue={currentRecord ? currentRecord.source : null} onChange={handleChange} required placeholder="Url to the project's source code" />
            </Form.Group>

            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <Button onClick={handleOnSubmit} variant='primary' type='submit'>
                {type == 'EDIT' ? 'Edit' : 'Add'}
              </Button>
              <Button onClick={() => navigate('/internal/projectEditor')} variant='primary'>
                Go back
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ProjectEditor
