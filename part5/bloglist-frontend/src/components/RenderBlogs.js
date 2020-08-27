import React from 'react'
import Blog from './Blog'

const RenderBlogs = ({ user, blogs, setBlogs, setMessage }) => {
  if(user){
    blogs.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))
    return blogs.map(blog =>
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} user={user} />
    )
  } return null
}


export default RenderBlogs