import React from 'react'
import peopleService from '../services/people';

const PersonForm = (props) => {

  const nameHandler = event => {
    const candidate = event.target.value;
    props.setNewName(candidate);
  };
  const phoneHandler = event => {
    props.setPhone(event.target.value);
  }

  const checkNameExistence = () => props.people.some(person => person.name === props.newName);

  const buttonHandler = event => {
    if (checkNameExistence()) {
        event.preventDefault();
        alert(props.newName + ' is already added to phonebook');
    } else {
          event.preventDefault();
          peopleService.create({name: props.newName, number: props.newPhone})
            .then(res => props.setPeople(props.people.concat(res)));
          props.setNewName('');
          props.setPhone('');
    }

  }
	return(
      <form>
        <div>
          name: <input value={props.newName} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={props.newPhone} onChange={phoneHandler} />
        </div>
        <div>
          <button type='submit' onClick={buttonHandler}> add </button>
        </div>
      </form>
		)
}

export default PersonForm;