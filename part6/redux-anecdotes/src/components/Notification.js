import React from 'react'
//import {useSelector} from 'react-redux'
import { connect } from 'react-redux'

//define a timeId state for this component
const Notification = (props) => {
  //const notification = useSelector(state => state.notification)
  const notification = props.notification
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {style={display: 'none'}}

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = state => {
  return{
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification