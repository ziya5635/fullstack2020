import React from 'react'


const Languages = ({languages}) => {
	return (
		<ul>
			{languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
		</ul>

		)
}

export default Languages;