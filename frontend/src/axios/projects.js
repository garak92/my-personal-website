import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

export const getProjectAxios = async () => {
  const res = await axios({
    method: 'get',
    url: `${baseURL}/api/projects/getprojects`
  }
  )
  return res.data
}

export const getProjectIdAxios = async (_id) => {
  const res = await axios({
    method: 'get',
    url: `${baseURL}/api/projects/getprojectsid/${_id}`
  }
  )
  return res.data
}

export const createProjectAxios = async (data) => {
  const { name, description, link, source } = data
  const res = await axios({
    method: 'post',
    url: `${baseURL}/api/projects/postprojects`,
    data: {
      name,
      description,
      link,
      source
    }
  }
  )
  return res.data
}

export const editProjectAxios = async (data, _id) => {
  const { name, description, link, source } = data
  const res = await axios({
    method: 'post',
    url: `${baseURL}/api/projects/editprojects/${_id}`,
    data: {
      name,
      description,
      link,
      source
    }
  }
  )
  return res.data
}

export const deleteProjectAxios = async (_id) => {
  const res = await axios({
    method: 'delete',
    url: `${baseURL}/api/projects/delprojects/${_id}`
  }
  )

  return res.data
}
