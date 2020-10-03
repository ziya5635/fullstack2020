import React, { useState } from 'react'
import blogServices from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setBlogComment } from '../reducers/blogReducer'

const AddComments = () => {
	const [comment, setComment] = useState('')
	const id = useParams().id
	const dispatch = useDispatch()

	const submitHandler = async event => {
		try{
			event.preventDefault()
			setComment('')
			const blog = await blogServices.addComments(id, comment)
			dispatch(setBlogComment(blog))
		}catch(error){
			console.log(error.message)
		}
	}

	const inputHandler = event => {
		event.preventDefault()
		setComment(event.target.value)
	}

	return (
		<form onSubmit={submitHandler}>
			<input value={comment} type='text' onChange={inputHandler}/>
			<button type='submit'>add comment</button>
		</form>
		)

}

export default AddComments