import React from 'react'
import loginService from '../services/login'
//import Blog from './Blog'

const Login = ({username, setUsername, password, setPassword, setUser, user}) => {

	const formHandler = async event => {
		try {
			event.preventDefault()
    		const user = await loginService.login({username, password})
    		if(user) {
    			setUser(user.data)
    			setUsername('')
    			setPassword('')
    		}
		} catch(e) {
			console.log(e.message)
		}

  	}

  	if (!user) {
  	return(
		<form onSubmit={formHandler}>
			<div><label htmlFor='username'>username </label>
			<input type='text' id='username' name='username' value={username} onChange= {event => setUsername(event.target.value)} autoComplete='off' autoFocus/></div>
			<div><label htmlFor='password'>password </label>
			<input type='password' id='password' name='password' value={password} onChange={event => setPassword(event.target.value)}/></div>
			<button type='submit'>login</button>
		</form>

		)
  	} return (
  		<p>{user.name} is logged in.</p>
  		)

}

export default Login