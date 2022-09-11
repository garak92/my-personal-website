import axios from 'axios'
const baseURL = process.env.REACT_APP_API_URL

export const login = async (data) => {
  const { password } = data
  const res = axios({
    method: 'post',
    url: `${baseURL}/api/users/login`,
    data: {
      password
    }
  }
  )
  return res
}

export const changePassword = async (data) => {
  const { oldpassword, newpassword } = data
  const res = axios({
    method: 'post',
    url: `${baseURL}/api/users/changepassword`,
    headers: { Authorization: localStorage.getItem('token') },
    data: {
      newpassword,
      oldpassword
    }
  }
  )
  return res
}
