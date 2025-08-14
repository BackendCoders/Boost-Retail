/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../services/operations/categoryApi';

const initialState = {
	loading: false,
	categories: [],
	category: null,
	parentCatOpts: [],
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setCategories(state, action) {
			state.categories = action.payload;
		},
		setCategory(state, action) {
			state.category = action.payload;
		},
		setParentCatOpts(state, action) {
			state.parentCatOpts = action.payload;
		},
	},
});

export function refreshAllCategories() {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const response = await getCategories();
			dispatch(setCategories(response));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export const { setLoading, setCategories, setCategory, setParentCatOpts } =
	categorySlice.actions;
export default categorySlice.reducer;
