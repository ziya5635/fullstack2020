import React from 'react';
import Languages from './Languages';

const Show = ({country}) => {
		return(
	<div>
		<h1>{country.name}</h1>
		<div>capital {country.capital}</div>
		<div>population {country.population}</div>
		<h2>languages</h2>
		<Languages languages={country.languages} />
		<p><img src={country.flag} width='100' height='100' alt={country.name} /></p>
	</div>)
}

export default Show;