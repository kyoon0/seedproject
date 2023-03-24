import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// creating the store to store data
export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});
