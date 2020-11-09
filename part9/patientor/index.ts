import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

//continue with 9.9 exercise.