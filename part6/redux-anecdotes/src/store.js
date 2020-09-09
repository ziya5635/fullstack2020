import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import timeoutReducer from './reducers/timeoutReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer,
	timeoutId: timeoutReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
