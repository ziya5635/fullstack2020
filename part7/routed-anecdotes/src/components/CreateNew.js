import React from 'react'
import { useHistory } from "react-router-dom"
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
    props.setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {props.setNotification('')}, 10000)
  }

  const handleReset = e => {
    e.preventDefault()
    content.onChange(e)
    author.onChange(e)
    info.onChange(e)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button value='' onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew