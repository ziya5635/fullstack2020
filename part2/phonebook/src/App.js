import React, { useState, useEffect } from 'react';
import Listing from './components/Listing';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import peopleService from './services/people';

const App = () => {

  const [people, setPeople] = useState([]);

  const [ newName, setNewName ] = useState('');

  const [newPhone, setPhone] = useState('');

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    peopleService.getAll()
      .then(res => setPeople(res))
      .catch(error => console.log(error.message));
  }, []);

  const nameHandler = event => {
    const candidate = event.target.value;
    setNewName(candidate);
  };

  const phoneHandler = event => {
    setPhone(event.target.value);
  }

  const keywordHandler = event => {
    setKeyword(event.target.value);
  }


  const checkNameExistence = () => people.some(person => person.name === newName);


  const savePeople = (toSave) => {
    peopleService.create(toSave)
    .then(res => console.log(`${res.name} created.`))
  }


  const buttonHandler = event => {
    if (checkNameExistence()) {
        event.preventDefault();
        alert(newName + ' is already added to phonebook');
    } else {
          event.preventDefault();
          const toSave = {name: newName, number: newPhone};
          savePeople({name: newName, number: newPhone});
          setPeople(people.concat(toSave));
          setNewName('');
          setPhone('');
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter keyword={keyword} keywordHandler={keywordHandler} />

      <h2>Add a new</h2>
      
      <PersonForm newName={newName} nameHandler={nameHandler} newPhone={newPhone} phoneHandler={phoneHandler} buttonHandler={buttonHandler} />

      <h2>Numbers</h2>
      <Listing people={people} keyword={keyword} />
    </div>
    )

}



export default App;
