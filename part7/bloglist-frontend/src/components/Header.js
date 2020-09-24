import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import {logoutUser} from '../reducers/userReducer'
import {useHistory} from 'react-router-dom'


const Header = () => {
	const dispatch = useDispatch()
	const notification = useSelector(state => state.notification)
	const user = useSelector(state => state.user)
	const history = useHistory()

	const handleLogout = () => {
    	dispatch(logoutUser())
    	history.push('/')
 	}
 	
	return (<div>
			  <h2>blogs</h2>
              <Notification notification={notification} />
              <p>
                {user.name} logged in <button onClick={handleLogout}>logout</button>
              </p>
			</div>
		)
}

export default Header