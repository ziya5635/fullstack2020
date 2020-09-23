import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usernameReducer from './reducers/usernameReducer'
import passwordReducer from './reducers/passwordReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
	blogs: blogReducer,
	user: userReducer,
	username: usernameReducer,
	password: passwordReducer,
	notification: notificationReducer
})


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

