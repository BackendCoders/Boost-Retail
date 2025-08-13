/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	loginUser: localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: null,
	token: localStorage.getItem('token')
		? JSON.parse(localStorage.getItem('token'))
		: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setLoginUser(state, action) {
			state.loginUser = action.payload;
		},
		setToken(state, action) {
			state.token = action.payload;
		},
	},
});

export const { setLoading, setLoginUser, setToken } = authSlice.actions;
export default authSlice.reducer;
