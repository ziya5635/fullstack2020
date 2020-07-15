import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const Heading = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>

const Statistic = ({ text, value }) => <div>{text} {value}</div>

const Statistics = props => {
	return (
		<div>
			<Statistic text='good' value={props.good} />
			<Statistic text='neutral' value={props.neutral} />
			<Statistic text='bad' value={props.bad} />
			<Statistic text='all' value={props.history.length} />
			<Statistic text='average' value={props.avg(props.history)} /> 
			<Statistic text='positive' value={props.positiveScore()} />
		</div>
		)

}

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

	if (history.length === 0) {
		return (
			<div>
				<Heading text='Give text' />
				<Button handler={goodHandler} text='good' />
				<Button handler={neutralHandler} text='neutral' />
				<Button handler={badHandler} text='bad' />
				<Heading text='Statistics' />
				<p>No text given</p>
			</div>
			)
	}
	return (
		<div>
			<Heading text='Give text' />
			<Button handler={goodHandler} text='good' />
			<Button handler={neutralHandler} text='neutral' />
			<Button handler={badHandler} text='bad' />
			<Heading text='Statistics' />
			<Statistics good={good} neutral={neutral} bad={bad} history={history} avg={avg} positiveScore={positiveScore} />
		</div>
		)
}

ReactDOM.render(<App />, document.getElementById('root'))



