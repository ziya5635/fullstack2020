import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import diagnosesRouter from './routes/diagnoses';


const app = express();

app.use(express.json());

const port = process.env.PORT;

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);



app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});