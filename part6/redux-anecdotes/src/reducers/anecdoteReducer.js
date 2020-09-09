import anecdoteService from '../services/anecdote'


export const createAnecdote = content => {
  return async dispatch => {
    try {
      const new_anecdote = await anecdoteService.create(content)
      dispatch({
        type: 'createAnecdote',
        data: {
         ...new_anecdote,
         votes: 0
        }
      })
    }catch(error){
      console.log(error.message)
    }

  }
}

export const createVote = (id, votes) => {
  return async dispatch => {
    try{
      const anecdote = await anecdoteService.update(id, votes)
      dispatch({
        type: 'vote',
        data: {
          votes: anecdote.votes,
          id: id
        }
      })
    }catch(error){
      console.log(error.message)
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    try{
      const anecdotes = await anecdoteService.getAll()
      dispatch({
        type: 'INIT_ANECDOTES',
        data: anecdotes
      }) 
    }catch(error){
      console.log(error.message)
    }
  }
}


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case('vote'):
      const new_state = state.map(item => item.id === action.data.id ? {...item, votes:action.data.votes}:item)
      return new_state
    case('createAnecdote'):
      return state.concat(action.data)
    case('INIT_ANECDOTES'):
      if (action.data) {return action.data} else {return state}
    default:
    return state
  }

}

export default reducer