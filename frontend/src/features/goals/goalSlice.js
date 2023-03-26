import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};
