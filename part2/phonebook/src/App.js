import React, { useState, useEffect } from 'react';
import Listing from './components/Listing';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import peopleService from './services/people';
import Notification from './components/Notification';
import './index.css';

const App = () => {

  const [people, setPeople] = useState([]);

  const [ newName, setNewName ] = useState('');

  const [ newPhone, setPhone ] = useState('');

  const [ keyword, setKeyword ] = useState('');

  const [ successMessage, setSuccessMessage ] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    peopleService.getAll()
      .then(res => setPeople(res))
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} status='success'/>
      <Notification message={errorMessage} status='error' />
      <Filter keyword={keyword} setKeyword={setKeyword} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newPhone={newPhone} people={people} 
       setPeople={setPeople} setNewName={setNewName} setPhone={setPhone}
       setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
      <h2>Numbers</h2>
      <Listing people={people} keyword={keyword} setPeople={setPeople} setSuccessMessage={setSuccessMessage}/>
    </div>
    )

}


export default App;
