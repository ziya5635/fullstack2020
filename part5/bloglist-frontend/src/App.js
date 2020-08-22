import React, { useState, useEffect } from 'react'
import RenderBlogs from './components/RenderBlogs'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Login username={username} setUsername={setUsername} password={password}
       setPassword={setPassword} setUser={setUser} user={user} />
       <RenderBlogs user={user} blogs={blogs} />
    </div>
  )
}

export default App