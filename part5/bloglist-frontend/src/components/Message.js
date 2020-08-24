import React from 'react'


const Message = ({message}) => {
	if (message.success) {
		return <p className='success'>{message.success}</p>
	} else if (message.error) {
		return <p className='error'>{message.error}</p>
	}else {
		return null
	}
}


export default Message