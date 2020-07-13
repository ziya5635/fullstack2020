import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const Heading = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>

const Stats = ({ feedback, score }) => <div>{feedback} {score}</div>

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const goodHandler = () => {
		setGood(good + 1)
	}

	const neutralHandler = () => {
		setNeutral(neutral + 1)
	}

	const badHandler = () => {
		setBad(bad + 1)
	}

	return (
		<div>
			<Heading text='Give feedback' />
			<Button handler={goodHandler} text='good' />
			<Button handler={neutralHandler} text='neutral' />
			<Button handler={badHandler} text='bad' />
			<Heading text='Statistics' />
			<Stats feedback='good' score={good} />
			<Stats feedback='neutral' score={neutral} />
			<Stats feedback='bad' score={bad} />
		</div>
		)
}

ReactDOM.render(<App />, document.getElementById('root'))



