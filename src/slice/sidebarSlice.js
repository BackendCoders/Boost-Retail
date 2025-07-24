/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	activeTopNavigation: 'Home',
	activeMiniMenu: null,
	sidebarOpen: false,
};

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		setActiveTopNavigation(state, action) {
			state.activeTopNavigation = action.payload;
			state.activeMiniMenu = null;
		},
		setActiveMiniMenu(state, action) {
			state.activeMiniMenu = action.payload;
		},
		closeSidebar(state, action) {
			state.sidebarOpen = action.payload;
		},
	},
});

export const { setActiveTopNavigation, setActiveMiniMenu, closeSidebar } =
	sidebarSlice.actions;

export default sidebarSlice.reducer;
