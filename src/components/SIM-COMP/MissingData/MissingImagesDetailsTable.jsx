/** @format */

import { useEffect, useRef, useState } from 'react';
import Table from '../MaintainLookupTable/Table';

export default function MissingImagesDetailsTable({
	selectedRows,
	setSelectedRows,
	selectedCategoryId,
	setSelectedCategoryId,
	categories,
	setAdvancedMode,
}) {
	const [dropdownRowId, setDropdownRowId] = useState(null);
	const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
	const highLightRef = useRef(null);

	const handleRowClick = (id) => {
		highLightRef.current = id;
		setSelectedCategoryId(id);
		setSelectedRows([]);
	};

	const columns = [
		{
			label: 'Image',
			key: 'image',
			type: 'checkbox',
			Cell: ({ row, value }) =>
				value ? (
					<div
						className='relative inline-block'
						onClick={(e) => {
							e.stopPropagation();
							const rect = e.currentTarget.getBoundingClientRect();
							setDropdownRowId(row.id);
							setSelectedCategoryId(row.id);
							setDropdownPosition({ x: rect.x, y: rect.y + rect.height });
						}}
					>
						<img
							src={value}
							alt='image'
							className='w-20 h-14 object-contain cursor-pointer'
						/>
					</div>
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
			label: 'SIM PN',
			key: 'simPn',
		},
		{
			label: 'EPOS PN',
			key: 'eposPn',
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
			label: 'Colors',
			key: 'color',
		},
		{
			label: 'Size',
			key: 'size',
		},
		{
			label: 'Season / Year',
			key: 'seasonYear',
		},
		{
			label: 'RRP',
			key: 'rrp',
			Cell: ({ value }) => <div>£{value}</div>,
		},
		{
			label: 'Supplier Url',
			key: 'supplierUrl',
		},
	];

	useEffect(() => {
		const handleClickOutside = () => setDropdownRowId(null);
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div>
			<Table
				columns={columns}
				data={categories}
				onRowClick={handleRowClick}
				selectedRow={selectedCategoryId}
				selectedRows={selectedRows}
				onMultiSelect={setSelectedRows}
				enableMultiSelect={true}
			/>
			{dropdownRowId && (
				<ul
					className='absolute z-50 bg-white border border-gray-60 shadow-md rounded w-56 text-sm'
					style={{
						top: dropdownPosition.y,
						left: dropdownPosition.x,
					}}
					onClick={(e) => e.stopPropagation()}
				>
					<li
						className='px-4 py-2 hover:bg-primary hover:text-white cursor-pointer'
						onClick={() => {
							setAdvancedMode(true);
							setDropdownRowId(null);
						}}
					>
						View all images
					</li>
					<li className='px-4 py-2 hover:bg-primary hover:text-white cursor-pointer'>
						Apply to same color
					</li>
					<li className='px-4 py-2 hover:bg-primary hover:text-white cursor-pointer'>
						Apply to selected products
					</li>
					<li className='px-4 py-2 hover:bg-primary hover:text-white cursor-pointer'>
						Apply to all products
					</li>
				</ul>
			)}
		</div>
	);
}
