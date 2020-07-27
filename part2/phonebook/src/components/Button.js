import React from 'react';
import peopleService from '../services/people';

const Button = ({id, setPeople, name, setSuccessMessage}) => {
	const handler = (event) => {

		const sync = () => {
			peopleService.getAll()
				.then(res => setPeople(res))
					.catch(err => console.log(err.message));
				};

		event.preventDefault();
		if (window.confirm(`Delete ${name}?`)) {
		 	peopleService.remove(id)
				.then(() => {
					sync();
					setSuccessMessage(`${name} removed successfuly from server.`);
					setTimeout(() => setSuccessMessage(null), 5000);
				})
					.catch(err => console.log(err.message));

		 } 

	}

	return <button onClick={handler}>delete</button>
}


export default Button;