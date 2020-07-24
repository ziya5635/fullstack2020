import React from 'react'


const Languages = ({languages}) => {
	return (
		<div>
		<h2>Spoken languages</h2>
		<ul>
			{languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
		</ul>
		</div>
		)
}

export default Languages;