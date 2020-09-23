import axios from 'axios'

const base_url = '/api/users'

const getUsers = async () => {
	try{
		const users = await axios.get(base_url)
		return users.data
	}catch(error){
		console.log(error.message)
	}
	
}


export default { getUsers }