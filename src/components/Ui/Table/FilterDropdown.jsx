/** @format */

import React, { useState, useEffect } from 'react';

const FilterDropdown = ({
	availableColumns,
	initialSelected,
	onApply,
	onCancel,
}) => {
	const [selected, setSelected] = useState(new Set(initialSelected));
	const [filterText, setFilterText] = useState('');
	const [filteredCols, setFilteredCols] = useState(availableColumns);

	// Update filtered columns on search input
	useEffect(() => {
		const lower = filterText.toLowerCase();
		setFilteredCols(
			availableColumns.filter((col) => col.toLowerCase().includes(lower))
		);
	}, [filterText, availableColumns]);

	// Toggle one column
	const toggle = (col) => {
		const next = new Set(selected);
		next.has(col) ? next.delete(col) : next.add(col);
		setSelected(next);
	};

	// Select All toggle
	const toggleSelectAll = () => {
		if (selected.size === availableColumns.length) {
			setSelected(new Set());
		} else {
			setSelected(new Set(availableColumns));
		}
	};

	return (
		<div className='absolute right-0 mt-2 w-64 bg-light border rounded shadow-lg z-20'>
			<div className='p-2 border-b'>
				<input
					type='text'
					placeholder='Filter results'
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
					className='w-full px-2 py-1 border rounded text-sm'
				/>
			</div>

			<div className='max-h-60 overflow-y-auto px-3 py-2'>
				<label className='flex items-center mb-2'>
					<input
						type='checkbox'
						checked={selected.size === availableColumns.length}
						onChange={toggleSelectAll}
						className='mr-2'
					/>
					<span className='font-medium'>Select All</span>
				</label>

				{filteredCols.map((col) => (
					<label
						key={col}
						className='flex items-center mb-1'
					>
						<input
							type='checkbox'
							checked={selected.has(col)}
							onChange={() => toggle(col)}
							className='mr-2'
						/>
						{col}
					</label>
				))}
			</div>

			<div className='flex justify-end space-x-2 p-3 border-t'>
				<button
					className='px-4 py-1 bg-blue-600 text-light text-sm rounded hover:bg-blue-700'
					onClick={() => onApply(Array.from(selected))}
				>
					APPLY
				</button>
				<button
					className='px-4 py-1 border text-sm rounded hover:bg-gray-100'
					onClick={onCancel}
				>
					CANCEL
				</button>
			</div>
		</div>
	);
};

export default FilterDropdown;
