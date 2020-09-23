import userService from '../services/users'


export const getUsers = () => {
	return async dispatch => {
		try{
			const users = await userService.getUsers()
			dispatch({type: 'getUsers', users: users})
		}catch(error){
			console.log(error)
		}
	}
}


const reducer = (state=[], action) => {
	switch(action.type){
		case('getUsers'):
			return action.users
		default:
			return state
	}
}

export default reducer