import React, { useState } from 'react';
import Listing from './components/Listing';

const App = () => {

  const [people, setPeople] = useState([
      {name: 'Arto Hellas', number:2332342}
    ]);
  const [ newName, setNewName ] = useState('');

  const [newPhone, setPhone] = useState('');

  const [keyword, setKeyword] = useState('');

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

  const buttonHandler = event => {
    if (checkNameExistence()) {
        event.preventDefault();
        alert(newName + ' is already added to phonebook');
    } else {
          event.preventDefault();
          setPeople(people.concat({name: newName, number: newPhone}));
          setNewName('');
          setPhone('');
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input value={keyword} onChange={keywordHandler} />
      </div>

      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={newPhone} onChange={phoneHandler} />
        </div>
        <div>
          <button type='submit' onClick={buttonHandler}> add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Listing people={people} keyword={keyword} />
    </div>
    )

}



export default App;
