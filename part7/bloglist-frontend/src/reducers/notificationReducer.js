
const timeout = 5000

export const setNotification = (message, type) => {
	return async dispatch => {
		dispatch({type: 'setNotification', data: {message: message, type: type}})
		setTimeout(() => dispatch({type: 'clear'}), timeout)
	}
}

const reducer = (state=null, action) => {
	switch(action.type){
		case('setNotification'):
			return action.data
		case('clear'):
			return null
		default:
			return state
	}
}


export default reducer