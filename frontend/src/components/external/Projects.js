import { getProjectAxios } from '../../axios/projects'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

function Projects () {
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const data = await getProjectAxios()
      setData(data)
    } catch (err) {
      console.error('Error: ', err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className='cardContainer'>
        <div className='container'>
          <h1 style={{ marginBottom: '1em' }} className='subtitle'>Here you can see some samples of my work</h1>
          <div className='row'>
            {data.data
              ? data.data.map(v =>
                <Card bg='dark' text='light' className='col-xxl-3 col-md-12'>
                  <Card.Body>
                    <Card.Title className='cardTitle'>{v.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted' />
                    <Card.Text className='paragraph'>
                      {v.description}
                    </Card.Text>
                    {v.link != '' ? <Card.Link href={v.link}>Website</Card.Link> : null}
                    <Card.Link href={v.source} target='_blank' rel='noopener noreferrer'>Source Code</Card.Link>
                  </Card.Body>
                </Card>
              )
              : <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
                </Spinner>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
