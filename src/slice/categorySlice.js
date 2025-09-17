/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
	getCategories,
	getCategoryLookups,
	getCategoryMaps,
} from '../services/operations/categoryApi';

export const supplierFeedsOptions = [
	{ value: 0, label: 'Cannondale' },
	{ value: 1, label: 'Cube' },
	{ value: 2, label: 'Frog' },
	{ value: 3, label: 'Giant' },
	{ value: 4, label: 'Haibike' },
	{ value: 5, label: 'Lapierre' },
	{ value: 6, label: 'Liv' },
	{ value: 7, label: 'Marin' },
	{ value: 8, label: 'Merida' },
	{ value: 9, label: 'Orbea' },
	{ value: 10, label: 'Raleigh' },
	{ value: 11, label: 'Specialized' },
	{ value: 12, label: 'Tern' },
	{ value: 13, label: 'Trek' },
	{ value: 14, label: 'Whyte' },
];

const initialState = {
	loading: false,
	categories: [],
	category: null,
	parentCatOpts: [],
	lookupTablesData: [],
	lookupTableDataRow: null,
	rowEditorTableData: [],
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
		setLookupTablesData(state, action) {
			state.lookupTablesData = action.payload;
		},
		setLookupTableDataRow(state, action) {
			state.lookupTableDataRow = action.payload;
		},
		setRowEditorTableData(state, action) {
			state.rowEditorTableData = action.payload;
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

export function refreshAllLookupTablesData() {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const response = await getCategoryLookups();
			dispatch(setLookupTablesData(response));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}
export function refreshAllRowEditorTableData(id) {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const response = await getCategoryMaps(id);
			dispatch(setRowEditorTableData(response));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export const {
	setLoading,
	setCategories,
	setCategory,
	setParentCatOpts,
	setLookupTablesData,
	setRowEditorTableData,
	setLookupTableDataRow,
} = categorySlice.actions;
export default categorySlice.reducer;
