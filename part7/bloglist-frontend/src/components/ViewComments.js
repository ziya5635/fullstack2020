import React from 'react'
import AddComments from './AddComments'

const ViewComments = ({blog}) => {
	if (blog.comments) {
		const comments = blog.comments
		return (
		<div>
			<h3>comments</h3>
			<AddComments/>
			<ul>
				{comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
			</ul>
		</div>
		)
	}
	return <div></div>

}


export default ViewComments