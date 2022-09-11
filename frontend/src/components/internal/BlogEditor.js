import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { getBlogAxios, deleteBlogAxios } from '../../axios/blogs'
import { alertMessage } from '../../utils'
import Table from 'react-bootstrap/Table'
import { Link, useNavigate } from 'react-router-dom'

const messageMilliseconds = 3000 // How many millisecs will the messages last

const BlogEditor = () => {
  // Declare states and variables that will be used later
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

  // Gets a list of all of the blogposts
  const getData = async () => {
    try {
      const data = await getBlogAxios()
      setData(data)
    } catch (err) {
      console.error('Error: ', err.message)
      handleShowMessage('danger', err.message)
    }
  }

  // Calls axios function to delete a blogpost
  const deleteData = async (_id) => {
    try {
      const data = await deleteBlogAxios(_id)
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
    navigate(`/internal/BlogEditor/edit/${path}`)
  }

  useEffect(() => {
    getData()
  }, [showMessage])

  return (
    <>
      <div style={{ position: 'absolute', top: 160, left: 0, display: 'flex' }}>
        <Link to='/internal/BlogEditor/add'><Button>Add new post</Button></Link>
        {alertMessage(message.type, message.message, showMessage)}
        <h1 style={{ marginLeft: '500px', marginTop: '-120px' }} className='subtitle'>Blogpost editor</h1>
      </div>
      <div style={{ width: 800, position: 'absolute', left: 0, top: 220, overflowY: 'scroll', maxHeight: '500px' }}>
        <Table striped bordered hover variant='dark' responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>createdDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data
              ? data.data.map(v => <tr id={v._id}>
                <td>
                  {v.title}
                </td>
                <td>
                  {v.createdDate}
                </td>
                <td>
                  <Button style={{ width: '80px', display: 'block', margin: 'auto' }} onClick={(e) => handleOnClickEdit(e)} className='btn btn-success'>Edit</Button>
                  <Button style={{ width: '80px', display: 'block', margin: 'auto' }} onClick={(e) => handleOnClickDelete(e)} className='btn btn-danger'>Delete</Button>
                </td>
              </tr>)
              : null}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default BlogEditor
