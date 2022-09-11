import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { getProjectAxios, deleteProjectAxios } from '../../axios/projects'
import { alertMessage } from '../../utils'
import Table from 'react-bootstrap/Table'
import { Link, useNavigate } from 'react-router-dom'

const messageMilliseconds = 3000

const ProjectEditor = () => {
  // Variables and states to be used later
  const [data, setData] = useState([])
  const [showMessage, setShowMessage] = useState()
  const [message, setMessage] = useState({})
  const navigate = useNavigate()

  // Controls the message component
  const handleShowMessage = (type, message) => {
    setShowMessage(true)
    setMessage({ type, message })
    setTimeout(() => setShowMessage(false), messageMilliseconds)
  }

  // Get all projects
  const getData = async () => {
    try {
      const data = await getProjectAxios()
      setData(data)
    } catch (err) {
      console.error('Error: ', err.message)
      handleShowMessage('danger', err.message)
    }
  }

  // Calls axios to delete a project by id
  const deleteData = async (_id) => {
    try {
      const data = await deleteProjectAxios(_id)
      handleShowMessage('success', data.msg)
    } catch (err) {
      console.error('Error: ', err.message)
      handleShowMessage('danger', err.message)
    }
  }

  // Button click handling logic
  const handleOnClickDelete = (e) => {
    deleteData(e.target.parentNode.parentNode.id)
  }

  const handleOnClickEdit = (e) => {
    const path = e.target.parentNode.parentNode.id
    navigate(`/internal/projectEditor/edit/${path}`)
  }

  useEffect(() => {
    getData()
  }, [showMessage])

  return (
    <>
      <div style={{ position: 'absolute', top: 160, left: 0, display: 'flex' }}>
        <Link to='/internal/projectEditor/add'><Button>Add new project</Button></Link>
        {alertMessage(message.type, message.message, showMessage)}
        <h1 style={{ marginLeft: '500px', marginTop: '-120px' }} className='subtitle'>Project Editor</h1>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 220, overflowY: 'scroll', maxHeight: '500px' }}>
        <Table striped bordered hover variant='dark' responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Link</th>
              <th>Source code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data
              ? data.data.map(v => <tr id={v._id}>
                <td>
                  {v.name}
                </td>
                <td>
                  {v.description}
                </td>
                <td>
                  <a href={v.link}>{v.link}</a>
                </td>
                <td>
                  <a href={v.source}>{v.source}</a>
                </td>
                <td>
                  <Button style={{ width: '80px', display: 'block', margin: 'auto' }} onClick={(e) => handleOnClickEdit(e)} className='btn btn-success'>Edit</Button>
                  <Button style={{ width: '80px' }} onClick={(e) => handleOnClickDelete(e)} className='btn btn-danger'>Delete</Button>
                </td>
              </tr>)
              : null}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ProjectEditor
