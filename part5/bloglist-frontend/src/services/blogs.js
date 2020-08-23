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
		console.log(e.message);
	}

}

const create = async data => {
	try {
		const config = {
		headers: {Authorization: token}
		}
		const newblog = await axios.post(baseUrl, data, config)
		return newblog
	} catch(e) {
		console.log(e.message);
	}

}

export default { getAll, create, setToken }