import React from 'react';
import Button from './Button';

const Listing = ({ selected, setCountry }) => {

		return (<div>
					{selected.map(item => {
						return <div key={item.name}> {item.name} <Button country={item} setCountry={setCountry}/></div>
										}
								)
					}
					
				</div>)
	
}

export default Listing;


