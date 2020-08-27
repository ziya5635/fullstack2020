import axios from 'axios'

const baseUrl = '/api/login'

const login = async credentials => {
  try {
    const user = await axios.post(baseUrl, credentials)
    return user
  } catch(err) {
    console.log(err.message)
  }

}


export default { login }