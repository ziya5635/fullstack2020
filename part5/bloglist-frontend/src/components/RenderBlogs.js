import React from 'react'
import Blog from './Blog'

const RenderBlogs = ({user, blogs, setMessage}) => {
	if(user){
       return blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setMessage={setMessage} /> 
      )
	} return null
}


export default RenderBlogs