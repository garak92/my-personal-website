import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'

function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLogged, setIsLogged } = useContext(AuthContext)

  const handleButtonOnClick = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    navigate('/login')
  }

  return (
    <>
      <Navbar fixed='top' bg='dark' variant='dark' responsive>
        <Container className='border-left pl-2 ml-auto'>
          {location.pathname.startsWith('/internal')
            ? <Nav className='m-auto' style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <LinkContainer to='/internal'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/internal/projectEditor'>
                <Nav.Link>Project Editor</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/internal/blogeditor'>
                <Nav.Link>Blogpost editor</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/internal/changepassword'>
                <Nav.Link>Change password</Nav.Link>
              </LinkContainer>
              <Button onClick={handleButtonOnClick}>
                Logout
              </Button>
            </Nav>
            : <Nav className='m-auto' style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/projects'>
                <Nav.Link>Projects</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/contact'>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={() => window.open('./files/fabrizio_pomata_resume_fullstack_2022.pdf')}>Resume</Nav.Link>
              <LinkContainer to='/blog'>
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
            </Nav>}
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
