import axios from 'axios'

const base_url = 'http://localhost:3001/anecdotes'



const getAll = async() => {
	try {
		const anecdotes = await axios.get(base_url)
		return anecdotes.data
	} catch(error){
		console.log(error.message)
	}

}

const create = async data => {
	try {
		const new_anecdote = {content: data}
		const anecdote = await axios.post(base_url, new_anecdote)
		return anecdote.data
	} catch(error){
		console.log(error.message)
	}
}

const update = async (id, votes) => {
	try {
		const anecdote = await axios.patch(`${base_url}/${id}`, {votes: votes})
		return anecdote.data
	}catch(error){
		console.log(error.message)
	}
}

export default { getAll, create, update }