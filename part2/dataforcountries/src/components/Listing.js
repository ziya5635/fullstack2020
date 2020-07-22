import React from 'react'



const Listing = ({ selected }) => {
	return <div>{selected.map(item => <div key={item.name}>{item.name}</div>)}</div>

}

export default Listing;
//sw