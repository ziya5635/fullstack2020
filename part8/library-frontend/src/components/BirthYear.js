import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BORN, ALL_AUTHORS } from '../queries.js'

const BirthYear = () => {
	const [name, setName] = useState('')
	const [born , setBorn] = useState('')

	const [setYear, result] = useMutation(SET_BORN, {
		refetchQueries: [{query: ALL_AUTHORS}], onError: error => console.log(error.message)
	})

	useEffect(() => {
		if (result.data && result.data.editAuthor === null) {
			console.log('person not found.')
		}
	}, [result])

	const submitHandler = event => {
		event.preventDefault()
		console.log(born)
		console.log(name)
		const setBornTo = parseInt(born)
		setYear({variables: {name, setBornTo}})
	}

	const nameHandler = event => {
		event.preventDefault()
		setName(event.target.value)
	}

	const bornHandler = event => {
		event.preventDefault()
		setBorn(event.target.value)
	}

	return (
	<div>
		<h2>set birth year</h2>
		<form onSubmit= {submitHandler}>
			<div>
				<label>
					name:
					<input name='name' value={name} onChange={nameHandler}/>
				</label>
			</div>
			<div>
				<label>
					born:
					<input name='born' value={born} onChange={bornHandler}/>
				</label>
			</div>

			<button type='submit'>update author</button>
		</form>
	</div>
	)
}


export default BirthYear