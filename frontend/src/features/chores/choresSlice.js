import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { create } from '../../../../backend/models/choreModel';
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

// Create new chore. Passing choreData in async to send the chores. ("[slice name]/[action name]")
export const createChores = createAsyncThunk('chores/createChores', async (choreData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await choresService.createChores(choreData, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get chores. Not passing in any data because we're not sending any data, only receiving
export const getChores = createAsyncThunk('chores/getChores', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await choresService.getChores(token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Delete chores. Passing choreData in async to send the chores.
export const deleteChores = createAsyncThunk('chores/deleteChores', async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await choresService.deleteChores(id, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Update/patch new chore. Passing choreData in async to send the chores.
export const getUpdatedChores = createAsyncThunk('chores/getUpdatedChores', async (choreData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await choresService.getUpdatedChores(choreData, token);
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
			})
			.addCase(createChores.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getChores.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getChores.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.chores = action.payload;
			})
			.addCase(getChores.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteChores.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteChores.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.chores = state.chores.filter((chore) => chore._id !== action.payload.id);
			})
			.addCase(deleteChores.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getUpdatedChores.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUpdatedChores.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.chores = action.payload;
			})
			.addCase(getUpdatedChores.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = choresSlice.actions;
export default choresSlice.reducer;
