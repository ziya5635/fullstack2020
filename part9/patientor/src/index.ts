import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';

const app = express();

app.use(cors());//configures cross origin resourse sharing, meaning one can prevent other domains/porotocols from accessing resources.

app.use(express.json());

const port = process.env.PORT;

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

app.use('/api/diagnosis', diagnosesRouter);

app.use('/api/patients', patientsRouter);


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});