import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

export const getBlogAxios = async () => {
  const res = await axios({
    method: 'get',
    url: `${baseURL}/api/blog/getblogs`
  }
  )
  return res.data
}

export const getBlogIdAxios = async (_id) => {
  const res = await axios({
    method: 'get',
    url: `${baseURL}/api/blog/getblogsid/${_id}`
  }
  )
  return res.data
}

export const createBlogAxios = async (data) => {
  const { title, content } = data
  const res = await axios({
    method: 'post',
    url: `${baseURL}/api/blog/postblogs`,
    data: {
      title,
      content
    }
  }
  )
  return res.data
}

export const editBlogAxios = async (data, _id) => {
  const { title, content } = data
  const res = await axios({
    method: 'post',
    url: `${baseURL}/api/blog/editblogs/${_id}`,
    data: {
      title,
      content
    }
  }
  )
  return res.data
}

export const deleteBlogAxios = async (_id) => {
  const res = await axios({
    method: 'delete',
    url: `${baseURL}/api/blog/delblogs/${_id}`
  }
  )

  return res.data
}
