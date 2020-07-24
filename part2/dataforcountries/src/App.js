import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Filter from './components/Filter';


const App = () => {
  const [keyword, setKeyword] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
      axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(res => {setCountries(res.data)})
      .catch(err => console.log(err.message));
  }, []);


  return(

    <div>
      <Search keyword={keyword} setKeyword={setKeyword} setCountry={setCountry}/>
      <Filter countries={countries} keyword={keyword} country={country} setCountry={setCountry} />
      
    </div>
    )
  
}

export default App;
