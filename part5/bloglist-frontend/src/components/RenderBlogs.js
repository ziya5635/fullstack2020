import React from 'react'
import Blog from './Blog'

const RenderBlogs = ({user, blogs, setMessage}) => {
	if(user){
		blogs.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))
       return blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setMessage={setMessage} /> 
      )
	} return null
}


export default RenderBlogs