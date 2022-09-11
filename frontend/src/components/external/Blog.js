import { getBlogAxios } from '../../axios/blogs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

function Blog() {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const data = await getBlogAxios()
      setData(data)
    } catch (err) {
      console.error('Error: ', err.message)
    }
  }

  const handleOnClickPost = (id) => {
    navigate(`/blog/post/${id}`)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className='container'>
        <h1 style={{ marginBottom: '1em' }} className='subtitle'>Michael Pomata's tech blog</h1>
        <div className='row'>
          {data.data
            ? data.data.map(v =>
              <p onClick={() => handleOnClickPost(v._id)} style={{ cursor: 'pointer' }} className='paragraph'>• {new Date(v.createdDate).toLocaleDateString()}: {v.title}</p>
            )
            : <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>}
        </div>
      </div>
    </>
  )
}

export default Blog
