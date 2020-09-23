import blogService from '../services/blogs'


export const initBlogs = () => {
	return async dispatch => {
		try{
			const blogs = await blogService.getAll()
			dispatch({type: 'initBlogs', data: blogs})
		}catch(error){
			console.log(error.message)
		}
		
	}
}

export const makeBlog = data => {
	return async dispatch => {
		try{
			const blog = await blogService.create(data)
			dispatch({
				type: 'createBlog',
				data: {...blog, likes: 0}
			})
		}catch(error){
			console.log(error.message)
		}
		
	}
}

export const updateBlog = data => {
	return async dispatch => {
		try{
			const blog = await blogService.update(data)
			dispatch({
				type: 'updateBlog',
				data: {...blog}
			})
		}catch(error){
			console.log(error.message)
		}
	}
}

export const removeBlog = id => {
	return async dispatch => {
		try{
			await blogService.remove(id)
			dispatch({type: 'removeBlog', id: id})
		}catch(error){
			console.log(error.message)
		}
	}
}


const reducer = (state=[], action) => {
	switch(action.type){
		case('initBlogs'):
			return action.data
		case('createBlog'):
			const newBlog = action.data
			return state.concat(newBlog)
		case('updateBlog'):
			const updated = action.data
			return state.map(item => item.id === updated.id ?  { ...item, likes: item.likes + 1 } : item)
		case('removeBlog'):
			return state.filter(item => item.id !== action.id)
		default:
			return state
	}
}

export default reducer
