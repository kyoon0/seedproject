import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import choresService from './choresService';

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	chores: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create new chore
export const createChores = createAsyncThunk('chores/createChores', async (choreData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await choresService.createChores(choreData, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const choresSlice = createSlice({
	name: 'chores',
	initialState,
	reducers: {
		reset: (reset) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createChores.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createChores.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.chores.push(action.payload);
				console.log(action);
			})
			.addCase(createChores.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = choresSlice.actions;
export default choresSlice.reducer;
