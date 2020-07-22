import React from 'react';
import Listing from './Listing';
import Show from './Show'

const Filter = ({countries, keyword, country, setCountry}) => {
		if (country) {
		return <Show country={country} />
	}
	
	if (countries.length) {
		const selected = countries.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
		if (selected.length > 10) {
			return <div>Too many matches, specify another filter.</div>
		}else if (selected.length > 1 && selected.length < 11) {
			return <Listing selected={selected} setCountry={setCountry} />
		}else if (selected.length === 1){
			return <Show country={selected[0]} /> 
		}else {
			return <div>No results to show</div>
		}
	}


	
	return <div></div>
}



export default Filter;