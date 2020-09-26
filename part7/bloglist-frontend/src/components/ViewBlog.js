import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const ViewBlog = () => {
	const dispatch = useDispatch()
	const id = useParams().id
	const blogs = useSelector(state => state.blogs)
	const selected = blogs.find(blog => blog.id === id)

	const users = useSelector(state => state.users)
	const blogMaker = users.map(user => user.blogs.find(blog => blog.id === selected.id))
	
	const handleLike = async () => {
    	const blogToLike = blogs.find(b => b.id === id)
    	const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    	dispatch(updateBlog(likedBlog))
  	}

	return (
		<div>
			<h1>{selected.title}</h1>
			<div><a href={selected.url}>{selected.url}</a></div>
			<div>{selected.likes} likes <button onClick={handleLike}>like</button></div>
			<div>added by {blogMaker[0].author}</div>
		</div>
		)
}


export default ViewBlog