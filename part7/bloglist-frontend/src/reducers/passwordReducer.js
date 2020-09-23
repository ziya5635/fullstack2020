



export const setPassword = password => {
	return {type: 'setPassword', password: password}
}


const reducer = (state='', action) => {
	switch(action.type){
		case('setPassword'):
			return action.password
		default:
			return state
	}
}

export default reducer