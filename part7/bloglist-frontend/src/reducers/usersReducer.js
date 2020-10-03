import userService from '../services/users'


export const getUsers = () => {
	return async dispatch => {
		try{
			const users = await userService.getUsers()
			if (users) {
				dispatch({type: 'getUsers', users: users})
			}else(
				dispatch({type: 'error'})
				)
		}catch(error){
			console.log(error)
		}
	}
}

export const addBlogToUser = (newBlog) => {
	return {type: 'addBlogToUser', blog: newBlog}
}

const insertBlog = (user, blog) => {
	const updated = user.blogs.concat(blog)
	user.blogs = updated
	return user
}


const reducer = (state=[], action) => {
	switch(action.type){
		case('getUsers'):
			return action.users
		case('addBlogToUser'):
			const id = action.blog.user.id
			const newBlog = action.blog
			const users = state.map(user => user.id === id ? insertBlog(user, newBlog) : user)
			return users
		case('error'):
			return state
		default:
			return state
	}
}

export default reducer