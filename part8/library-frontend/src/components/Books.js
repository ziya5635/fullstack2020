import React from 'react'
import { ALL_BOOKS } from '../queries.js'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const res = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (res.loading) {
    return <div>loading...</div>
  }

  const books = res.data.allBooks;console.log(books)

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
    </div>
  )
}

export default Books