import React from 'react'


const PersonForm = (props) => {
	return(
      <form>
        <div>
          name: <input value={props.newName} onChange={props.nameHandler} />
        </div>
        <div>
          number: <input value={props.newPhone} onChange={props.phoneHandler} />
        </div>
        <div>
          <button type='submit' onClick={props.buttonHandler}> add </button>
        </div>
      </form>
		)
}

export default PersonForm;