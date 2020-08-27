import React, { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogMaker = ({ setBlogs, blogs, setMessage, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const formHandler = async event => {
    try {
      event.preventDefault()
      const data = {
        author: event.target.author.value,
        url: event.target.url.value,
        title: event.target.title.value
      }
      const newBlog = await blogService.create(data)
      if (newBlog) {
        blogFormRef.current.toggleVisibility()
        setBlogs(() => blogs.concat(newBlog.data))//blogs as argument removed
        setAuthor('')
        setUrl('')
        setTitle('')
        setMessage({ success: `a new blog named ${newBlog.data.title} add by ${user.name}.` })
        setTimeout(() => setMessage(''), 4000)
        return newBlog
      } else {
        setMessage({ error: 'unable to create the blog.' })
        setTimeout(() => setMessage(''), 4000)
        return null
      }
    } catch(e) {
      console.log(e.message)
    }

  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
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
    </Togglable>
  )
}

export default BlogMaker