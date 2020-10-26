import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { SET_BORN, ALL_AUTHORS } from '../queries.js'

const BirthYear = () => {
	const [name, setName] = useState('')
	const [born , setBorn] = useState('')

	const [setYear, result] = useMutation(SET_BORN, {
		refetchQueries: [{query: ALL_AUTHORS}], onError: error => console.log(error.message)
	})

	const authors = useQuery(ALL_AUTHORS).data.allAuthors

	useEffect(() => {
		if (result.data && result.data.editAuthor === null) {
			console.log('person not found.')
		}
	}, [result])

	const submitHandler = event => {
		event.preventDefault()
		if (name) {
			const setBornTo = parseInt(born)
			setYear({variables: {name, setBornTo}})
			//console.log(result.data.editAuthor)
		}

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
				<select value={name} onChange={nameHandler}>
					<option key={'select'} name='select' value=''>select</option>
					{authors.map(author => <option key={author.name} name='name' value={author.name}>{author.name}</option>)}
				</select>
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