/** @format */

import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slice/sidebarSlice';
import authReducer from './slice/authSlice';
import categoryReducer from './slice/categorySlice';
import simProductReducer from './slice/simProductSlice';
import supplierFeedReducer from './slice/supplierFeedSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
		category: categoryReducer,
		simProduct: simProductReducer,
		supplierFeed: supplierFeedReducer,
	},
});
