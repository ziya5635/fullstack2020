import React from 'react';
import Listing from './Listing';
import Show from './Show'

const Filter = ({countries, keyword}) => {
	
	if (countries.length) {
		const selected = countries.filter(country => country.name.toLowerCase().includes(keyword.toLowerCase()));
		if (selected.length > 10) {
			return <div>Too many matches, specify another filter.</div>
		}else if (selected.length > 1 && selected.length < 11) {
			return <Listing selected={selected} />
		}else if (selected.length === 1){
			return <Show country={selected[0]} /> 
		}
	}


	
	return <div></div>
}



export default Filter;