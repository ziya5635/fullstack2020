import React from 'react'
import Blog from './Blog'

const RenderBlogs = ({user, blogs}) => {
	if(user){
       return blogs.map(blog =>
        <Blog key={blog.id} blog={blog} /> 
      )
	} return null
}


export default RenderBlogs