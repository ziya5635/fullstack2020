import React from 'react';
import Languages from './Languages';
import Weather from './Weather';

const Show = ({country}) => {
		return(
	<div>
		<h1>{country.name}</h1>
		<div>capital {country.capital}</div>
		<div>population {country.population}</div>
		<Languages languages={country.languages} />
		<p><img src={country.flag} width='100' height='100' alt={country.name} /></p>
		<Weather capital={country.capital} />
	</div>)
}

export default Show;