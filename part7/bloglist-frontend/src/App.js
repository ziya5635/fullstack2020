import React, { useEffect } from 'react'
import Blog from './components/Blog'
import ViewBlog from './components/ViewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import ViewUsers from './components/ViewUsers'
import ViewUser from './components/ViewUser'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs, makeBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { initUser, loginUser } from './reducers/userReducer'
import { getUsers, addBlogToUser } from './reducers/usersReducer'
import { setUsername } from './reducers/usernameReducer'
import { setPassword } from './reducers/passwordReducer'
import './App.css'
import {Button, Input, GlobalStyle} from './styles.js'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const username = useSelector(state => state.username)
  const password = useSelector(state => state.password)
  const notification = useSelector(state => state.notification)
  
  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(setUsername(''))
    dispatch(setPassword(''))
    dispatch(loginUser(username, password))
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await dispatch(makeBlog(blog))
      dispatch(addBlogToUser(newBlog))
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

  if ( !user ) {
    return (
        <div>
          <GlobalStyle/>
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
              <Input
                id='password'
                value={password}
                onChange={({ target }) => dispatch(setPassword(target.value))}
              />
            </div>
            <Button id='login'>login</Button>
          </form>
        </div>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
      <Router>
        <GlobalStyle/>
        <Notification notification={notification} />
        <Navbar/>
        <h2>blog app</h2>
        <Switch>
          <Route path='/blogs/:id'>
            <ViewBlog />
          </Route>
          <Route path='/users/:id'>
            <ViewUser />
          </Route>
          <Route path='/users'>
            <ViewUsers/>
          </Route>
          <Route path='/'>
            <div>
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
          </Route>
        </Switch>
      </Router>
  )
}

export default App

//<button id='login'>login</button>