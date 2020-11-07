
import express from 'express';
require('dotenv').config({ path: __dirname+'/.env' });

const app = express();


app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack');
})

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`server is running on port ${port}`)
})