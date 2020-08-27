import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl)
  		return request.data
  } catch(e) {
    console.log(e.message)
  }

}

const create = async data => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const newblog = await axios.post(baseUrl, data, config)
    return newblog
  } catch(e) {
    console.log(e.message)
    return null
  }

}


const update = async (id, data) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const result = await axios.put(`${baseUrl}/${id}`, data, config)
    return result
  } catch(e) {
    console.log(e.message)
    return null
  }
}

const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const result = await axios.delete(`${baseUrl}/${id}`, config)
    return result
  } catch(e) {
    console.log(e.message)
    return null
  }
}

export default { getAll, create, setToken, update, remove }