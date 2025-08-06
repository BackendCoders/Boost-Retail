/** @format */

// import { useRef } from 'react';
import Table from '../MaintainLookupTable/Table';

export default function MissingImagesTable({
	// selectedCategoryId,
	setSelectedCategoryId,
	categories,
}) {
	// const highLightRef = useRef(null);

	// const handleRowClick = (id) => {
	// 	highLightRef.current = id;
	// 	setSelectedCategoryId(id);
	// };

	const columns = [
		{
			label: 'Image',
			key: 'image',
			type: 'checkbox',
			Cell: ({ row }) => (
				<button
					className='text-sm text-primary
					group-hover:text-white whitespace-nowrap'
					onClick={() => setSelectedCategoryId(row.id)}
				>
					Add Images
				</button>
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
			label: 'Brand',
			key: 'title',
		},
		{
			label: 'Season / Year',
			key: 'seasonYear',
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
		{
			label: 'Price',
			key: 'price',
			Cell: ({ value }) => <div className='text-black'>£{value}</div>,
		},
	];

	return (
		<div>
			<Table
				columns={columns}
				data={categories}
				enableRowSelection={false}
			/>
		</div>
	);
}
