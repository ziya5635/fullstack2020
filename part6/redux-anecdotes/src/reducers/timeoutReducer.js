
const initialState = null


export const setTimeoutId = id => {
	return {type: 'TIMEOUT_ID', timeoutId: id}
}


const reducer = (state = initialState, action)  => {
	switch(action.type){
		case('TIMEOUT_ID'):
			return action.timeoutId
		default:
			return state
	}
}

export default reducer