import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ViewUser = () => {
	const id = useParams().id
	const users = useSelector(state => state.users)
	const selected = users.find(user => user.id === id)
	return (
		<div>
			<Header/>
			<div>{selected ? selected.blogs.map(blog => <ul key={blog.id}><li>{blog.title}</li></ul>):null}</div>
		</div>
		)
}

export default ViewUser