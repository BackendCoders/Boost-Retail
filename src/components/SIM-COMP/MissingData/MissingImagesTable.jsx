/** @format */

import { useRef } from 'react';
import Table from '../MaintainLookupTable/Table';

export default function MissingImagesTable({
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
			type: 'checkbox',
			Cell: ({ row, value }) =>
				value ? (
					<img
						src={value}
						alt='image'
						className='w-20 h-14 object-contain'
					/>
				) : (
					<span
						className={`text-sm  ${
							row.id === highLightRef.current ? 'text-white' : 'text-primary'
						}group-hover:text-white`}
					>
						Upload Image
					</span>
				),
		},
		{
			label: 'MPN',
			key: 'mpn',
		},
		{
			label: 'Barcode',
			key: 'barcode',
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
			label: 'Colors',
			key: 'color',
		},
		{
			label: 'Season / Year',
			key: 'seasonYear',
		},
		{
			label: 'Supplier Url',
			key: 'supplierUrl',
		},
	];

	return (
		<div>
			<Table
				columns={columns}
				data={categories}
				onRowClick={handleRowClick}
				selectedRow={selectedCategoryId}
			/>
		</div>
	);
}
