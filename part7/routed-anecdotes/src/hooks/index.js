import { useState } from 'react'


export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = event => {
		event.preventDefault()
		setValue(event.target.value)
	}
	return {
		value,
		onChange,
		type
	}
}
