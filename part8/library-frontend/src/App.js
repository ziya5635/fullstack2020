import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries.js'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [getBooks, {data}] = useLazyQuery(ALL_BOOKS)
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])

  const client = useApolloClient()


  useEffect(() => {
    if (data) {
       setFavorites(data.allBooks)
    }
  }, [data])

  useEffect(() => {
    setToken(localStorage.getItem('phonenumbers-user-token'))
  }, [setToken])

  const logout = event => {
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const recommendHandler = event => {
    event.preventDefault()
    setPage('recommend')
    const genre = user.favoriteGenre
    getBooks({variables: {genre}})
  }


  if (!token) {
    return(
      <div>
        <nav>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </nav>
        <Login setToken={setToken} show={page === 'login'} setPage={setPage}/>
        <Authors show={page === 'authors'}/>
        <Books show={page === 'books'}/>
        <NewBook show={page === 'add'}/>
      </div>
      )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={recommendHandler}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend show={page === 'recommend'} favorites={favorites} setUser={setUser}/>

    </div>
  )
}

export default App