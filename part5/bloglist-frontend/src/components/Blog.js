import React, {useState} from 'react'

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false)

	const handler = event => setVisible(!visible)

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
			<div>likes {blog.likes} <button>like</button></div>
			<div>{blog.author}</div>
		</div>
		)
	}


}

export default Blog
