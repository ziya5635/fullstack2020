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
        const toUpdate = props.people.find(person => person.name === props.newName);
        if (window.confirm(props.newName + ' is already added to phonebook, replace the old number with a new one?')) {
            peopleService.update(toUpdate.id, {...toUpdate, number:props.newPhone})
              .then(res => {
                props.setNewName('');
                props.setPhone('');
                props.setPeople(props.people.map(person => person.id !== res.id ? person:res));
                props.setSuccessMessage(`${toUpdate.name} info updated successfully.`);
                setTimeout(() => props.setSuccessMessage(null), 5000);
              })
                .catch(err => {
                  props.setErrorMessage(`Information of ${toUpdate.name} has already been removed from server.`);
                  setTimeout(() => props.setErrorMessage(null), 5000);
                });

        }  

    } else {
          event.preventDefault();
          peopleService.create({name: props.newName, number: props.newPhone})
            .then(res => props.setPeople(props.people.concat(res)));
          props.setNewName('');
          props.setPhone('');
          props.setSuccessMessage(`Added ${props.newName} to phonebook.`);
          setTimeout(() => props.setSuccessMessage(null), 5000);
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
          <button type='submit' onClick={buttonHandler}>add</button>
        </div>
      </form>
		)
}

export default PersonForm;