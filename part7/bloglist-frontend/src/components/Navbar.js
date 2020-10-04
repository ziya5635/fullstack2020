import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logoutUser} from '../reducers/userReducer'
import { Button } from '../styles.js'

const Navbar = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const history = useHistory()

	const handleLogout = () => {
    	dispatch(logoutUser())
    	history.push('/')
 	}

	return (
		<nav className='navbar'>
			<Link to='/'>blogs</Link>
			<Link to='/users'>users</Link>
			 <p>
                {user.name} logged in <Button onClick={handleLogout}>logout</Button>
             </p>
		</nav>
		)
}

export default Navbar

/*


*/