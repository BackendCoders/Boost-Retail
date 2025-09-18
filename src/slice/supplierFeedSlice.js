/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getSupplierFeeds } from '../services/operations/supplierFeedApi';

const initialState = {
	loading: false,
	supplierFeedsData: [],
	supplierFeed: null,
};

const supplierFeedSlice = createSlice({
	name: 'supplierFeed',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setSupplierFeedsData(state, action) {
			state.supplierFeedsData = action.payload;
		},
		setSupplierFeed(state, action) {
			state.supplierFeed = action.payload;
		},
	},
});

export function refreshSupplierFeedsData() {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const response = await getSupplierFeeds();
			dispatch(setSupplierFeedsData(response));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export const { setLoading, setSupplierFeedsData, setSupplierFeed } =
	supplierFeedSlice.actions;
export default supplierFeedSlice.reducer;
