import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Weather = ({capital}) => {
	const [data, setData] = useState({});
	useEffect(() => {
		const apiKey = process.env.REACT_APP_API_KEY;
		axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`)
		.then(res => {
			setData(res.data);
		})
		.catch(err => console.log(err.message))
		}, [capital])
	if (data.current) {
		return (
		<div>
			<h2>Weather in {capital}</h2>
			<b>Temperature: </b><span>{data.current.temperature} Celcius</span> 
			<div><img src={data.current.weather_icons[0]} alt={`${capital} icon`}/></div>
			<b>Wind: </b><span>{data.current.wind_speed} {data.current.wind_dir}</span>
		</div>
		)
	}
	return (
		<div>
			
		</div>
		)
}

export default Weather;