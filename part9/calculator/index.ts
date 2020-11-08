
import express from 'express';
import { calculateBmi } from './src/bmiCalculator';
import { calculateExercises } from './src/exerciseCalculator';
import bodyParser from 'body-parser';


require('dotenv').config({ path: __dirname+'/.env' });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({extended: true}));
//app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);
	if(height && weight){
		res.json(calculateBmi(height, weight));
	}else{
		res.send({error: "malformatted parameters"});
	}
});
// curl -H 'Content-Type: application/json' -X POST -d '{"daily_exercises":["1", "0", "2", "0", "3", "0", "2.5"],"target":"2.5"}' http://localhost:3003/exercises

app.post('/exercises', (req, res) => {
	const daily_exercises:number[] = req.body.daily_exercises.map(Number);
	const target = req.body.target;

	if(daily_exercises.length < 7 || !target){
		res.json({error: "parameters missing"});
	}else{
		try{
			res.json(calculateExercises(daily_exercises, target));
		}catch(error){
			console.log(error.message);
			res.send({error: 'malformatted parameters'});
		}
	}

});

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});