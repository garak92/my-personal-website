import { getBlogAxios } from '../../axios/blogs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { Helmet } from "react-helmet";
import logo from '../../logo3.png';

function Blog() {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const formatAsUrl = (text) => {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  const getData = async () => {
    try {
      const data = await getBlogAxios()
      setData(data)
    } catch (err) {
      console.error('Error: ', err.message)
    }
  }

  const handleOnClickPost = (id, title) => {
    navigate(`/blog/post/${id}/${title}`)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Michael Pomata's tech blog</title>
        <meta name="description" content="Blog posts" />
        <meta property="og:image" content={logo} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={logo} />
      </Helmet>
      <div className='container'>
        <h1 style={{ marginBottom: '1em' }} className='subtitle'>Michael Pomata's tech blog</h1>
        <div className='row'>
          {data.data
            ? data.data.map(v =>
              <p onClick={() => handleOnClickPost(v._id, formatAsUrl(v.title))} style={{ cursor: 'pointer' }} className='paragraph'>• {new Date(v.createdDate).toLocaleDateString()}: {v.title}</p>
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
