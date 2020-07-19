import React from 'react';


const Listing = ({ people }) => people.map(person => <div key={person.name}>{person.name}</div>);


export default Listing;
