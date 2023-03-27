import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import choresReducer from '../features/chores/choresSlice';

// creating the store to store data
export const store = configureStore({
	reducer: {
		auth: authReducer,
		chores: choresReducer,
	},
});

export default store;
