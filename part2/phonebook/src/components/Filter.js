import React from 'react';


const Filter = ({keyword, keywordHandler}) => <div>filter shown with <input value={keyword} onChange={keywordHandler} /></div>


export default Filter;