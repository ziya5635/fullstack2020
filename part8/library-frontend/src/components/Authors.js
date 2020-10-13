import React from 'react'
import { useQuery } from '@apollo/client'
import {ALL_AUTHORS} from '../queries.js'

const Authors = (props) => {
  const res = useQuery(ALL_AUTHORS)
  console.log(res.data)
  if (!props.show) {
    return null
  }

  
  if (res.loading) {
    return <div>loading...</div>
  }
  const authors = res.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
