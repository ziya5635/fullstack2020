import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setMessage }) => {
	const [visible, setVisible] = useState(false)
	const [likes, setLikes] = useState(blog.likes)

	const handler = event => setVisible(!visible)

	const likeHandler = async event => {
		try {
			const result = await blogService.update(blog.id, {$inc : {'likes' : 1}})
			if (result) {
				setLikes(result.data.likes)
				return result
			} else {
				setMessage({error: 'Unauthorized user! You do not own this blog.'})
				setTimeout(() => setMessage(''), 4000)
				return null
			}

		} catch(e) {
			console.log(e.message);
			return null
		}
	}

	if (!visible) {
		return(
		  <div className='blog'>
    		{blog.title} {blog.author} <button onClick={handler}>show</button>
 		 </div>
 		 )
	} else {
		return(
		<div className='blog'>
			<div>{blog.title} <button onClick={handler}>hide</button></div>
			<div>{blog.url}</div>
			<div>likes {likes} <button onClick={likeHandler}>like</button></div>
			<div>{blog.author}</div>
		</div>
		)
	}


}

export default Blog
