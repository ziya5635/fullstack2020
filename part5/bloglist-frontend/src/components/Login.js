import React, { useState } from 'react'
import loginService from '../services/login'
import BlogMaker from './BlogMaker'
import blogService from '../services/blogs'


const Login = ({ setUser, user, setBlogs, blogs, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const formHandler = async event => {
    try {
      event.preventDefault()
      const myStorage = window.localStorage
    		const user = await loginService.login({ username, password })
    		if(user) {
    			myStorage.setItem('loggedUser', JSON.stringify(user.data))
    			blogService.setToken(user.data.token)
    			setUser(user.data)
    			setUsername('')
    			setPassword('')
    			setMessage({ success: `${user.data.name} logged in successfully.` })
    			setTimeout(() => setMessage(''), 4000)
    			return user
    		}else {
    			setMessage({ error: 'invalid user or password' })
    			setTimeout(() => setMessage(''), 4000)
    			return null
    		}
    } catch(e) {console.log('hey')
      console.log(e.message)
    }

  	}

  	const logoutHandler = event => {
  		event.preventDefault()
  		window.localStorage.removeItem('loggedUser')
  		setMessage({ success: `${user.name} logged out successfully.` })
    	setTimeout(() => setMessage(''), 4000)
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
  			<BlogMaker setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} user={user} />
  		</div>
  		)

}

export default Login