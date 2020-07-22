import React from 'react';


const Search = ({keyword, setKeyword, setCountry}) => {
	const nameHandler = event => {
		setKeyword(event.target.value);
		 setCountry('');
		}
		
	return(
		<div>find countries <input value={keyword} onChange={nameHandler} autoFocus/></div>
		)
}

export default Search;

