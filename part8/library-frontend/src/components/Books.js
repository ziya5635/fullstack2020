import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries.js'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const res = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')

  if (!props.show) {
    return null
  }

  if (res.loading) {
    return <div>loading...</div>
  }

  let books = res.data.allBooks

  if (genre !== 'all') {
    const filtered_books = []
    books.forEach(book => {
      const res = book.genres.filter(item => item === genre)
      if (res.length) {filtered_books.push(book)}
    })
    books = filtered_books
  }

  const genreHandler = event => {
    event.preventDefault()
    setGenre(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button name='refactoring' value='refactoring' onClick={genreHandler}>refactoring</button>
      <button name='agile' value='agile' onClick={genreHandler}>agile</button>
      <button name='pattern' value='pattern' onClick={genreHandler}>pattern</button>
      <button name='design' value='design' onClick={genreHandler}>design</button>
      <button name='crime' value='crime' onClick={genreHandler}>crime</button>
      <button name='classic' value='classic' onClick={genreHandler}>classic</button>
      <button name='all' value='all' onClick={genreHandler}>all genres</button>
    </div>
  )
}

export default Books