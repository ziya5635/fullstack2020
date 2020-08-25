import React, { useState, useEffect } from 'react'
import RenderBlogs from './components/RenderBlogs'
import blogService from './services/blogs'
import Login from './components/Login'
import Message from './components/Message'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <Login setUser={setUser} user={user} setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} /> 
      <RenderBlogs user={user} blogs={blogs} setMessage={setMessage}/>

    </div>
  )
}

export default App