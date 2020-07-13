import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const Heading = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>

const Stats = ({ feedback, score }) => <div>{feedback} {score}</div>

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [history, setHistory] = useState([]);

	const goodHandler = () => {
		setHistory(history.concat(1));
		setGood(good + 1);
	}

	const neutralHandler = () => {
		setHistory(history.concat(0));
		setNeutral(neutral + 1);
	}

	const badHandler = () => {
		setHistory(history.concat(-1));
		setBad(bad + 1);
	}


	const avg = array => {
		let sum = 0;
		array.forEach(item => sum += item);
		return sum / array.length;
	}

	const positiveScore = () => ((good / history.length) * 100) + '%';

	
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
			<Stats feedback='all' score={history.length} />
			<Stats feedback='average' score={avg(history)} />
			<Stats feedback='positive' score={positiveScore()} />
		</div>
		)
}

ReactDOM.render(<App />, document.getElementById('root'))



