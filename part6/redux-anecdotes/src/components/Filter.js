import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'
//shomare ro az rahim gholam rezaee gereft, talebian zang zad
const Filter = (props) => {
  //const dispatch = useDispatch()
  const handleChange = (event) => {
    const keyword = event.target.value
    //dispatch(filter(keyword))
    props.filter(keyword)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filter: keyword => dispatch(filter(keyword))
  }
}

const connectedFilter = connect(null, mapDispatchToProps)(Filter)

export default connectedFilter