/** @format */

import { useRef } from 'react';
import Table from '../MaintainLookupTable/Table';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProductId } from '../../../slice/simProductSlice';

export default function SimProductsTable() {
	const { simProducts, selectedProductId } = useSelector(
		(state) => state.simProduct
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const highLightRef = useRef(null);

	const handleRowClick = (id) => {
		highLightRef.current = id;
		dispatch(setSelectedProductId(id));

		navigate(`/admin/sim/products/maintain/${id}`);
	};

	const columns = [
		{
			label: 'ID',
			key: 'id',
		},
		{
			label: 'MPN',
			key: 'mpn',
		},
		{
			label: 'Title',
			key: 'title',
		},
		{
			label: 'Brand',
			key: 'brand',
		},
		{
			label: 'Supplier',
			key: 'supplier',
		},
		{
			label: 'Size',
			key: 'size',
		},
		{
			label: 'Colour',
			key: 'colour',
		},
		{
			label: 'Year',
			key: 'year',
		},
		{
			label: 'RRP',
			key: 'rrp',
			Cell: ({ value }) => <div>£{value}</div>,
		},
		{
			label: 'Price',
			key: 'price',
			Cell: ({ value }) => <div>£{value}</div>,
		},
		{
			label: 'Stock',
			key: 'stock',
		},
		{
			label: 'Category 1',
			key: 'category1',
		},
		{
			label: 'Category 2',
			key: 'category2',
		},
		{
			label: 'Category 3',
			key: 'category3',
		},
	];
	return (
		<div>
			<Table
				columns={columns}
				data={simProducts}
				onRowClick={handleRowClick}
				selectedRow={selectedProductId}
			/>
		</div>
	);
}
