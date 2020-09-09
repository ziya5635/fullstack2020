import React from 'react'
import { connect } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { notifyVote } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
	const anecdotes = props.anecdotes
	let sorted = anecdotes.sort((a,b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votees) ? -1 : 0))
	const filter = props.filter
	if (filter !== 'all') {
		sorted = sorted.filter(anecdote => anecdote.content.includes(filter))
	}

	const vote = (id) => {
	    console.log('vote', id)
	    const anecdote_selected = anecdotes.find(item => item.id === id)
	    const votes = anecdote_selected.votes + 1
	    props.createVote(id, votes)
	    props.notifyVote(anecdote_selected.content, props.timeoutId)
  	}
  	return (
  		<div>
	  		{sorted.map(anecdote =>
	        <div key={anecdote.id}>
	          <div>
	            {anecdote.content}
	          </div>
	          <div>
	            has {anecdote.votes}
	            <button onClick={() => vote(anecdote.id)}>vote</button>
	          </div>
	        </div>
	      )}
  		</div>

  		)

}

const mapStateToProps = state => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter,
		timeoutId: state.timeoutId
	}
}

const mapDispatchToProps = dispatch => {
	return{
		createVote: (id, votes) => {dispatch(createVote(id, votes))},
		notifyVote: (content, timeoutId) => {dispatch(notifyVote(content, timeoutId))}
	}
}

const connectedAnnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnnecdoteList