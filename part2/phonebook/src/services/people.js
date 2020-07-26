import axios from 'axios';

const baseUrl = 'http://localhost:3001/people';

const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then(res => res.data);
};

const getOne = (name) => {
	const req = axios.get(`${baseUrl}/?name=${name}`);
	return req.then(res => res.data[0]);
}

const create = data => {
	const req = axios.post(baseUrl, data);
	return req.then(res => res.data);
};

const remove = id => {
	const req = axios.delete(`${baseUrl}/${id}`);
	return req.then(res => res);
}

const update = (id, obj) => {
	const req = axios.put(`${baseUrl}/${id}`, obj);
	return req.then(res => res.data);
}

export default {getAll, create, remove, update, getOne};
