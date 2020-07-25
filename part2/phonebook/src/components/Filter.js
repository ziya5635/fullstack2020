import React from 'react';


const Filter = ({keyword, setKeyword}) => {
	const keywordHandler = event => {
    	setKeyword(event.target.value);
 	 };
	return <div>filter shown with <input value={keyword} onChange={keywordHandler} /></div>
}



export default Filter;