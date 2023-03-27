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
	console.log(choreData);
	return response.data;
};

const choresService = {
	createChores,
};

export default choresService;
