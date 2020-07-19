import React, { useState } from 'react';
import Listing from './components/Listing';

const App = () => {

  const [people, setPeople] = useState([
      {name: 'Arto Hellas'}
    ]);
  const [ newName, setNewName ] = useState('');


  const inputHandler = event => {
    const candidate = event.target.value;
    setNewName(candidate);
  }

  const checkNameExistence = () => people.some(person => person.name === newName);

  const buttonHandler = event => {
    if (checkNameExistence()) {
        event.preventDefault();
        alert(newName + ' is already added to phonebook');
    } else {
          event.preventDefault();
          setPeople(people.concat({name: newName}));
          setNewName('');
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={inputHandler}/>
        </div>
        <div>
          <button type='submit' onClick={buttonHandler}> add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Listing people={people} />
    </div>
    )

}



export default App;
