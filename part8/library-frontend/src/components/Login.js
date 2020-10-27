import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'


const Login = ({ setToken, show, setPage }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [login, result] = useMutation(LOGIN, {onError: error => error.graphQLErrors[0].message})

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('phonenumbers-user-token', token)
		}
	}, [result.data, setToken])

	const formHandler = event => {
		event.preventDefault()
		login({variables: {username, password}})
		setUsername('')
		setPassword('')
		setPage('authors')

	}
	const nameHandler = event => {
		event.preventDefault()
		setUsername(event.target.value)
	}
	const passwordHandler = event => {
		event.preventDefault()
		setPassword(event.target.value)
	}
	if (!show) {
		return null
	}
	return (
		<form onSubmit={formHandler}>
			<div>
				<label id='username'>username</label>
				<input htmlFor='username' type='text' onChange={nameHandler} value={username}/>
			</div>
			<div>
				<label id='password'>password</label>
				<input htmlFor='password' type='password' onChange={passwordHandler} value={password}/>
			</div>
			<button type='submit'>login</button>
		</form>
		)
}

export default Login