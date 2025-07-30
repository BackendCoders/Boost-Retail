/** @format */

import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slice/sidebarSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
	},
});
