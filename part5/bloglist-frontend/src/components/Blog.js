import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, setMessage, user }) => {
  const [visible, setVisible] = useState(false)

  const handler = event => setVisible(!visible)

  const likeHandler = async event => {
    try {
      const result = await blogService.update(blog.id, { $inc : { 'likes' : 1 } })
      if (result) {
      	setBlogs(() => {
      		return blogs.map(item => item.id === blog.id ? { ...item, likes:result.data.likes }:item)
      	})
        return result
      } else {
        setMessage({ error: 'Unauthorized user! You do not own this blog.' })
        setTimeout(() => setMessage(''), 4000)
        return null
      }

    } catch(e) {
      console.log(e.message)
      return null
    }
  }

  const display = { display: blog.user.username === user.username ? '':'none' }

  const dropRemovedBlog = (blogs, id) => blogs.filter(blog => blog.id !== id)

  const removeHandler = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        const res = await blogService.remove(blog.id)
        if(res){
          setMessage({ success: `${blog.title} by ${blog.author} removed successfully.` })
          setBlogs(() => {
            return dropRemovedBlog(blogs, blog.id)
          })
          setTimeout(() => setMessage(''), 4000)
          return res
        }
      }return null
    } catch(e) {
      console.log(e.message)
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
        <div>likes {blog.likes} <button onClick={likeHandler}>like</button></div>
        <div>{blog.author}</div>
        <button style={display} onClick={removeHandler}>remove</button>
      </div>
    )
  }


}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}



export default Blog
