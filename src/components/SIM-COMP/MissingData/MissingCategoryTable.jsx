/** @format */

import { useRef } from 'react';
import Table from '../MaintainLookupTable/Table';

export default function MissingCategoryTable({
	selectedCategoryId,
	setSelectedCategoryId,
	categories,
}) {
	const highLightRef = useRef(null);

	const handleRowClick = (id) => {
		highLightRef.current = id;
		setSelectedCategoryId(id);
	};

	const columns = [
		{
			label: 'Image',
			key: 'image',
			Cell: ({ value }) => (
				<img
					src={value}
					alt='image'
					className='w-18 h-14 object-contain'
				/>
			),
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
			label: 'Model',
			key: 'model',
		},
		{
			label: 'Supplier Categories',
			key: 'supplierCategories',
		},
		{
			label: 'Category 1',
			key: 'category1',
			Cell: ({ value }) => (
				<select
					className='border p-1 text-sm w-full text-black'
					value={value}
					// onChange={(e) => onChange(row.id, 'category1', e.target.value)}
				>
					<option value=''>Select Category</option>
					<option value='Bike'>Bike</option>
					<option value='Electric Bike'>Electric Bike</option>
					<option value='Scooter'>Scooter</option>
				</select>
			),
		},
		{
			label: 'Category 2',
			key: 'category2',
			Cell: ({ value }) => (
				<select
					className='border p-1 text-sm w-full text-black'
					value={value}
					// onChange={(e) => onChange(row.id, 'category2', e.target.value)}
				>
					<option value=''>Select Category</option>
					<option value='Road'>Road</option>
					<option value='Electric Mountain'>Electric Mountain</option>
					<option value='Hybrid'>Hybrid</option>
				</select>
			),
		},
		{
			label: 'Category 3',
			key: 'category3',
			Cell: ({ value }) => (
				<select
					className='border p-1 text-sm w-full text-black'
					value={value}
					// onChange={(e) => onChange(row.id, 'category3', e.target.value)}
				>
					<option value=''>Select Category</option>
					<option value='Performance'>Performance</option>
					<option value='Time Trial'>Time Trial</option>
					<option value='Full Suspension'>Full Suspension</option>
				</select>
			),
		},
	];

	return (
		<div>
			<Table
				columns={columns}
				data={categories}
				onRowClick={handleRowClick}
				selectedRow={selectedCategoryId}
				enableRowSelection={false}				
			/>
		</div>
	);
}
