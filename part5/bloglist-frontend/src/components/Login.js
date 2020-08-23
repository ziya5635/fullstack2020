import React from 'react'
import loginService from '../services/login'
import BlogMaker from './BlogMaker'

const Login = ({username, setUsername, password, setPassword, setUser, user, setBlogs, blogs}) => {

	const formHandler = async event => {
		try {
			event.preventDefault()
			const myStorage = window.localStorage
    		const user = await loginService.login({username, password})
    		if(user) {
    			myStorage.setItem('loggedUser', JSON.stringify(user))
    			setUser(user.data)
    			setUsername('')
    			setPassword('')
    		}
    		return user
		} catch(e) {
			console.log(e.message)
		}

  	}

  	const logoutHandler = event => {
  		event.preventDefault()
  		window.localStorage.removeItem('loggedUser')
  		setUser(null)
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
  		<div>
  			<span>{user.name} is logged in</span>
  			<button type='submit' onClick={logoutHandler}>logout</button>
  			<BlogMaker setBlogs={setBlogs} blogs={blogs} />
  		</div>
  		)

}

export default Login