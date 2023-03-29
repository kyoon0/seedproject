import axios from 'axios';

const API_URL = '/api/chores/';

// Create new chore
const createChores = async (choreData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, choreData, config);
	console.log(response.data);
	// console.log(choreData);
	return response.data;
};

// Get chores
const getChores = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	// console.log(response.data);
	return response.data;
};

// Delete chores
const deleteChores = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + id, config);
	console.log(response.data);
	return response.data;
};

const choresService = {
	createChores,
	getChores,
	deleteChores,
};

export default choresService;
