import { setTimeoutId } from './timeoutReducer'

const initialState = null
const time_to_delay = 5000

export const notifyVote = (content, currentTimeoutId) => {
	return async dispatch => {
		if (currentTimeoutId !== null) {
			clearTimeout(currentTimeoutId)}
		dispatch({type: 'notifyVotes', data: content})
		const timeoutId = setTimeout(()=> {dispatch(clearNotification())}, time_to_delay)
		dispatch(setTimeoutId(timeoutId))
	}
}


export const notifyCreation = content => {
	return async dispatch => {
		dispatch({type: 'notifyCreation', data: content})
		setTimeout(() => {dispatch(clearNotification())}, time_to_delay)
	}
}

export const clearNotification = () => {
	return {type: 'clear'}
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case('notifyVotes'):
			return `you voted ${action.data}`
		case('notifyCreation'):
			return `you created ${action.data}`
		case('clear'):
			return null
		default:
		return state
	}

}

export default reducer
