import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useContext } from 'react'

const isTokenExpired = () => {
  const currenTimeStamp = Math.floor(Date.now() / 1000)
  const token = localStorage.getItem('token')
  if (!token) {
    console.log('No token')
    return true
  }
  const { exp } = jwtDecode(token)

  if (currenTimeStamp >= exp) {
    return true
  }

  return false
}

const Private = ({ isLogged, children }) => {
  if (!isLogged || isTokenExpired()) {
    return <Navigate to='/' replace />
  }
  return children
}

export default Private
