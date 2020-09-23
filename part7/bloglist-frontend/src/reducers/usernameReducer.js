

export const setUsername = username => {
	return {type: 'setUsername', username: username}
}




const reducer = (state='', action) => {
	switch(action.type){
		case('setUsername'):
			return action.username
		default:
			return state
	}
}

export default reducer