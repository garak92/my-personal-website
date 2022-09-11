import axios from 'axios'
const baseURL = process.env.REACT_APP_API_URL

export const sendMailAxios = async (content, sender) => {
  const res = axios({
    method: 'post',
    url: `${baseURL}/api/sendmail`,
    data: {
      content
    }
  }
  )
  return res
}
