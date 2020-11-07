
import express from 'express';
import { calculateBmi } from './src/bmiCalculator'

require('dotenv').config({ path: __dirname+'/.env' });

const app = express();

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack');
})

app.get('/bmi', (req, res) => {
	const height:number = Number(req.query.height);
	const weight:number = Number(req.query.weight);
	if(height && weight){
		res.json(calculateBmi(height, weight));
	}else{
		res.send({error: "malformatted parameters"});
	}
})

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
})