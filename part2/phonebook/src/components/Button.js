import React from 'react';
import peopleService from '../services/people';


const Button = ({id, setPeople, name}) => {
	const handler = (event) => {
		event.preventDefault();
		if (window.confirm(`Delete ${name}?`)) {
		 	peopleService.remove(id)
				.then(() => {console.log(`${name} removed successfuly.`)})
					.catch(err => console.log(err.message));
			
			peopleService.getAll()
				.then(res => setPeople(res))
					.catch(err => console.log(err.message));
		 } 

	}

	return <button onClick={handler}>delete</button>
}


export default Button;