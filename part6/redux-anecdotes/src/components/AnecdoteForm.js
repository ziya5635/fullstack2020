import React from 'react'
//import {useDispatch} from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyCreation } from '../reducers/notificationReducer'


const NewAnecdote = (props) => {
	//const dispatch = useDispatch()
  const create = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    //dispatch(createAnecdote(content))
    //dispatch(notifyCreation(content))
    props.createAnecdote(content)
    props.notifyCreation(content)
  }

	return(
		<div>
      		<h2>create new</h2>
      		<form onSubmit={create}>
        		<div><input type='text' name='content'/></div>
       		 <button type='submit'>create</button>
      		</form>
		</div>

		)
}

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: content => {dispatch(createAnecdote(content))},
    notifyCreation: content => {dispatch(notifyCreation(content))}
  }
}

const NewAnecdoteConnected = connect(null, mapDispatchToProps)(NewAnecdote)

export default NewAnecdoteConnected