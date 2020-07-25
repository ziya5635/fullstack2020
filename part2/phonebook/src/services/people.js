import axios from 'axios';

const baseUrl = 'http://localhost:3001/people';

const getAll = () => {
	const req = axios.get(baseUrl)
	return req.then(res => res.data)
};



const create = data => {
	const req = axios.post(baseUrl, data);
	return req.then(res => res.data);
};

const remove = id => {
	const req = axios.delete(`${baseUrl}/${id}`);
	return req.then(res => res);
}


export default {getAll, create, remove};
