import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogMaker = ({setBlogs, blogs}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const formHandler = async event => {
		try {
			event.preventDefault()
			const data = {
				author: event.target.author.value,
				url: event.target.url.value,
				title: event.target.title.value
			}
			const newBlog = await blogService.create(data)
			setBlogs(blogs => blogs.concat(newBlog.data))
			setAuthor('')
			setUrl('')
			setTitle('')
			return newBlog
		} catch(e) {
			console.log(e.message);
		}

	}

	return (
		<div>
		<h2>create new</h2>
		<form onSubmit={formHandler}>
		<div>
			<label htmlFor='title'>title</label>
			<input type='text' id='title' name='title' value={title} onChange={e => setTitle(e.target.value)} required/>
		</div>
		<div>
			<label htmlFor='author'>author</label>
			<input type='author' id='author' name='author' value={author} onChange={e => setAuthor(e.target.value)} required/>
		</div>
		<div>
			<label htmlFor='url'>url</label>
			<input type='text' id='url' name='url' value={url} onChange={e => setUrl(e.target.value)} required/>
		</div>
		<button type='submit' >create</button>
		</form>
		</div>
		)
}

export default BlogMaker