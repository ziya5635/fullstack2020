import React from 'react';



const Button = ({country, setCountry}) => {
		const clickHandler = event => {
			event.preventDefault();
			setCountry(country);
	}
	return <button onClick={clickHandler}>show</button>
}


export default Button;