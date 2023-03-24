import { createSlice } from '@reduxjs/toolkit';
//createAsyncThunk

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// slice is to condense actions and reducers
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {},
	},
	extraReducers: () => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
