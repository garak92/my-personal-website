import MarkdownEditor from '@uiw/react-markdown-editor'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createBlogAxios, editBlogAxios, getBlogIdAxios } from '../../axios/blogs'
import { alertMessage } from '../../utils'

const messageMilliseconds = 3000

function BlogEditor(props) {
  // States and variables to be used later
  const { type } = props // Indicates wheter the form is in EDIT or ADD mode
  const { id } = useParams() // The id of the record being edited
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState()
  const [currentRecord, setCurrentRecord] = useState()
  const [message, setMessage] = useState({})
  const [blogPost, setBlogPost] = useState({ title: '', content: '' }) // Stores the blogpost

  // Controls the message component
  const handleShowMessage = (type, message) => {
    setShowMessage(true)
    setMessage({ type, message })
    setTimeout(() => setShowMessage(false), messageMilliseconds)
  }

  // Gets the record by its id
  const getDataId = async () => {
    try {
      const data = await getBlogIdAxios(id)
      setCurrentRecord(data.record)
      return data.record
    } catch (err) {
      console.error('Error: ', err.message)
      handleShowMessage('danger', err.message)
    }
  }

  // Button click handling logic
  const handleButtonOnClick = async () => {
    try {
      const data = type == 'ADD' ? await createBlogAxios(blogPost) : await editBlogAxios(blogPost, id)
      type == 'ADD' ? handleShowMessage('success', `Blog post "${data.data.title}" created successfully!`) : handleShowMessage('success', `${data.msg}!`)
    } catch (err) {
      console.error(err.message)
      handleShowMessage('danger', err.message)
    }
  }

  const handleTitleOnChange = (e) => {
    setBlogPost({ ...blogPost, title: e.target.value })
  }

  // Gets record to be edited, but only if we are on EDIT mode
  useEffect(() => {
    if (type == 'EDIT') {
      getDataId()
    }
  }, [])

  // Initializes blogPost with the data from the current record
  useEffect(() => {
    setBlogPost({ title: currentRecord?.title, content: currentRecord?.content })
  }, [currentRecord])

  return (
    <>
      <div style={{ marginTop: "5vh" }} className='mdeditor'>
        <div style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '10px' }}>
          <Button className='Button' onClick={handleButtonOnClick}>{type === 'ADD' ? 'Publish' : 'Submit changes'}</Button>
          <Button onClick={() => navigate('/internal/blogEditor')} variant='primary'>
            Go back
          </Button>
        </div>
        {alertMessage(message.type, message.message, showMessage)}
        <InputGroup className='mb-3'>
          <InputGroup.Text style={{ backgroundColor: '#70767E', color: '#161B22' }} id='basic-addon1'>Post title</InputGroup.Text>
          <Form.Control
            style={{ backgroundColor: '#161B22', color: '#70767E' }}
            placeholder='Write an interesting title!'
            aria-label='Post title'
            aria-describedby='basic-addon1'
            onChange={(e) => handleTitleOnChange(e)}
            defaultValue={currentRecord ? currentRecord.title : null}
          />
        </InputGroup>
        <MarkdownEditor
          value={currentRecord
            ? currentRecord.content
            : `
                
                
                
                
                `}
          onChange={(value, viewUpdate) => setBlogPost({ ...blogPost, content: value })}
        />
      </div>
    </>
  )
};

export default BlogEditor
