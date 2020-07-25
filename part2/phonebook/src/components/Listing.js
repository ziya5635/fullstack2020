import React from 'react';
import Button from './Button';

const Listing = ({ people, keyword, setPeople }) => {

	const toShow = people.filter(person => person.name.toLowerCase().includes(keyword.toLowerCase()))
	return(toShow.map(person => <div key={person.name}>{person.name} {person.number} <Button id={person.id} setPeople={setPeople} name={person.name}/></div>))

}


export default Listing;
