import React, {useState, useImperativeHandle} from 'react'


const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const var1 = {display: visible ? 'none' : ''}
	const var2 = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {toggleVisibility}
	})


	return (
		<div>
			<div style={var1}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={var2}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>

		)
})

export default Togglable