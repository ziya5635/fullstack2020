import React from 'react';
import Button from './Button';

const Listing = ({ people, keyword, setPeople, setSuccessMessage }) => {

	const toShow = people.filter(person => person.name.toLowerCase().includes(keyword.toLowerCase()))
	return(toShow.map(person => <div key={person.name}>{person.name} {person.number} <Button id={person.id} setPeople={setPeople} name={person.name} setSuccessMessage={setSuccessMessage}/></div>))

}


export default Listing;
