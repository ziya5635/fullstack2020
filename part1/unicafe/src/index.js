import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>

const Statistic = ({ text, value }) => <td>{text} {value}</td>

const Statistics = props => {
	if (props.history.length === 0) {
		return (<p>No feedback given</p>)
	}
	return (
		<div>
			<table>
				<tbody>
				<tr>
					<Statistic text='good' value={props.good} />
				</tr>
				<tr>
					<Statistic text='neutral' value={props.neutral} />
				</tr>
				<tr>
					<Statistic text='bad' value={props.bad} />
				</tr>
				<tr>
					<Statistic text='all' value={props.history.length} />
				</tr>
				<tr>
					<Statistic text='average' value={props.avg(props.history)} /> 
				</tr>
				<tr>
					<Statistic text='positive' value={props.positiveScore()} />
				</tr>
				</tbody>
			</table>
		</div>
		)

}

const Votes = ({ votes, selected }) => <p>has {votes[selected]} votes</p>

const Anecdote = ({anecdotes, selected }) => <p>{anecdotes[selected]}</p>

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [history, setHistory] = useState([]);
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0));

	const anecdotes = [
  		'If it hurts, do it more often',
  		'Adding manpower to a late software project makes it later!',
  		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  		'Premature optimization is the root of all evil.',
  		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


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

	const getRandomNumber = () => Math.floor(Math.random() * Math.floor(anecdotes.length));

	const anecdoteHandler = () => {
		setSelected(getRandomNumber());
	}

	const voteHandler = () => {
		const copy = [...votes];
		copy[selected] += 1;
		setVotes(copy);
	}

	const mostVoted = () => {
		if (Math.max(...votes) === 0) {
			return getRandomNumber();
		}
		return votes.indexOf(Math.max(...votes));
	}

	return (
		<div>
			<Heading text='Give feedback' />
			<Button handler={goodHandler} text='good' />
			<Button handler={neutralHandler} text='neutral' />
			<Button handler={badHandler} text='bad' />
			<Heading text='Statistics' />
			<Statistics good={good} neutral={neutral} bad={bad} history={history} avg={avg} positiveScore={positiveScore} />
			<Heading text='Anecdote of the day'/>
			<Anecdote anecdotes={anecdotes} selected={selected} />
			<Votes votes={votes} selected={selected}/>
			<Button handler={voteHandler} text='vote' />
			<Button handler={anecdoteHandler} text='next anecdote' />
			<Heading text='Anecdote with most votes' />
			<Anecdote anecdotes={anecdotes} selected={mostVoted()} />
			<Votes votes={votes} selected={mostVoted()} />
		</div>
		)
}

ReactDOM.render(<App />, document.getElementById('root'))



