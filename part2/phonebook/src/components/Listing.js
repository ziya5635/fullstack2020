import React from 'react';


const Listing = ({ people, keyword }) => {

	const toShow = people.filter(person => person.name.toLowerCase().includes(keyword.toLowerCase()));
	return(toShow.map(person => <div key={person.name}>{person.name} {person.number}</div>))

}


export default Listing;
