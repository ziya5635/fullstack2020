import React from 'react';


const Search = ({keyword, setKeyword}) => {
	const nameHandler = event => {setKeyword(event.target.value)};
	return(
		<div>find countries <input value={keyword} onChange={nameHandler} /></div>
		)
}

export default Search;

