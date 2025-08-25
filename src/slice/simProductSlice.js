/** @format */

import { createSlice } from '@reduxjs/toolkit';

const fakeProducts = [
	{
		id: 1,
		mpn: '1043167',
		title: 'Remedy 12',
		brand: 'TREK',
		supplier: 'TREK',
		size: 'SMALL',
		colour: 'CRIMSON',
		year: 2022,
		rrp: 2750,
		price: 1999.99,
		stock: 5,
		category1: 'Bikes',
		category2: 'Mountain',
		category3: '',
	},
	{
		id: 2,
		mpn: '1043167',
		title: 'Remedy 9',
		brand: 'TREK',
		supplier: 'TREK',
		size: 'MED',
		colour: 'CRIMSON',
		year: 2022,
		rrp: 2750,
		price: 1999.99,
		stock: 5,
		category1: 'Bikes',
		category2: 'Mountain',
		category3: '',
	},
	{
		id: 3,
		mpn: '1043168',
		title: 'Remedy 6',
		brand: 'TREK',
		supplier: 'TREK',
		size: 'ML',
		colour: 'CRIMSON',
		year: 2022,
		rrp: 2750,
		price: 1999.99,
		stock: 5,
		category1: 'Bikes',
		category2: 'Mountain',
		category3: '',
	},
	{
		id: 4,
		mpn: '1043169',
		title: 'Remedy 5',
		brand: 'TREK',
		supplier: 'TREK',
		size: 'LGE',
		colour: 'CRIMSON',
		year: 2022,
		rrp: 2750,
		price: 1999.99,
		stock: 5,
		category1: 'Bikes',
		category2: 'Mountain',
		category3: '',
	},
];

const initialState = {
	loading: false,
	simProducts: fakeProducts,
	selectedProductId: null,
};

const simProductSlice = createSlice({
	name: 'simProduct',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setSimProducts(state, action) {
			state.simProducts = action.payload;
		},
		setSelectedProductId(state, action) {
			state.selectedProductId = action.payload;
		},
	},
});

// export function refreshAllSimProducts() {
// 	return async (dispatch) => {
// 		try {
// 			dispatch(setLoading(true));
// 			const response = await getSimProducts();
// 			dispatch(setSimProducts(response));
// 		} catch (error) {
// 			console.log(error);
// 		} finally {
// 			dispatch(setLoading(false));
// 		}
// 	};
// }

export const { setLoading, setSimProducts, setSelectedProductId } =
	simProductSlice.actions;
export default simProductSlice.reducer;
