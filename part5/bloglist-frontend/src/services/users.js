import axios from 'axios'

const baseUrl = '/api/users'


const getOne = async id => {
	try {
		const user = await axios.get(`${baseUrl}/${id}`)
		if (user) {
			return user
		} else {
			return null
		}
	} catch(e) {
		console.log(e.message)
		return null
	}
}

export default {getOne}