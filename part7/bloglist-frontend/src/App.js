import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
//import blogService from './services/blogs'
//import loginService from './services/login'
//import storage from './utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs, makeBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { initUser, loginUser, logoutUser } from './reducers/userReducer'
import { setUsername } from './reducers/usernameReducer'
import { setPassword } from './reducers/passwordReducer'
//import { setNotification } from './reducers/notificationReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const blogs = useSelector(state => state.blogs)
  //const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)
  //const [username, setUsername] = useState('')
  const username = useSelector(state => state.username)
  //const [password, setPassword] = useState('')
  const password = useSelector(state => state.password)
  //const [notification, setNotification] = useState(null)
  const notification = useSelector(state => state.notification)

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])
  /*
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])*/

  useEffect(() => {
    //const user = storage.loadUser()
    //setUser(user)
    dispatch(initUser())
  }, [dispatch])
/*
  const notifyWith = (message, type='success') => {
    setNotification({
      message, type
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }*/

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(setUsername(''))
    dispatch(setPassword(''))
    dispatch(loginUser(username, password))
    /*
    try {
      
      const user = await loginService.login({
        username, password
      })
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      //setUsername('')
      //setPassword('')
      //setUser(user)
      dispatch(loginUser(username, password))
      //notifyWith(`${user.name} welcome back!`)
      //storage.saveUser(user)
    } catch(exception) {console.log('error')
      //notifyWith('wrong username/password', 'error')
      dispatch(setNotification('wrong username/password', 'error'))
    }*/
  }

  const createBlog = async (blog) => {
    try {
      //const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      //setBlogs(blogs.concat(newBlog))
      dispatch(makeBlog(blog))
      //notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(updateBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleLogout = () => {
    //setUser(null)
    //storage.logoutUser()
    dispatch(logoutUser())
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => dispatch(setUsername(target.value))}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => dispatch(setPassword(target.value))}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default App