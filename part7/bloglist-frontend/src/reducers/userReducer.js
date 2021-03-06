import storage from '../utils/storage'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'


export const initUser = () => {
	return dispatch => {
		const user = storage.loadUser()
		dispatch({type: 'initUser', user: user})
	}
}

export const loginUser = (username, password) => {
	return async dispatch => {
		try{
			const user = await loginService.login({username, password})
			if (user) {
				storage.saveUser(user)
				dispatch({type: 'loginUser', user: user})
				dispatch(setNotification(`${user.name} welcome back!`, 'success'))
			}else{
				dispatch({type: 'error'})
				dispatch(setNotification('wrong username/password', 'error'))
			}
		}catch(error){
			console.log(error.message)
		}
	}
}

export const logoutUser = () => {
	return dispatch => {
		storage.logoutUser()
		dispatch({type: 'logoutUser', user: null})
	}
}


const reducer = (state=null, action) => {
	switch(action.type){
		case('initUser'):
			return action.user
		case('loginUser'):
			return action.user
		case('logoutUser'):
			return action.user
		case('error'):
			return null
		default:
			return state
	}

}

export default reducer