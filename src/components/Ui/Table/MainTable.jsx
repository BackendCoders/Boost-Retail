/** @format */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import SortUp from '../../../assets/svgIcons/Sort-Up-Thin.svg';
import SortDown from '../../../assets/svgIcons/Sort-Down-Thin.svg';
import Funnel from '../../../assets/svgIcons/Funnel-Thin.svg';

const textFilterOptions = [
	'Contains',
	'Starts with',
	'Equals',
	'Ends with',
	'Not contain',
	'Not equal',
];

const numberFilterOptions = [
	'Equals',
	'Greater than',
	'Less than',
	'Greater or equal',
	'Less or equal',
	'Not equal',
];

const applyTextFilter = (value, filterValue, type) => {
	const val = String(value).toLowerCase();
	const filt = String(filterValue).toLowerCase();
	switch (type) {
		case 'Contains':
			return val.includes(filt);
		case 'Starts with':
			return val.startsWith(filt);
		case 'Equals':
			return val === filt;
		case 'Ends with':
			return val.endsWith(filt);
		case 'Not contain':
			return !val.includes(filt);
		case 'Not equal':
			return val !== filt;
		default:
			return true;
	}
};

const applyNumberFilter = (value, filterValue, type) => {
	const num = parseFloat(value);
	const filt = parseFloat(filterValue);
	if (isNaN(num) || isNaN(filt)) return true;
	switch (type) {
		case 'Equals':
			return num === filt;
		case 'Greater than':
			return num > filt;
		case 'Less than':
			return num < filt;
		case 'Greater or equal':
			return num >= filt;
		case 'Less or equal':
			return num <= filt;
		case 'Not equal':
			return num !== filt;
		default:
			return true;
	}
};

const MainTable = ({
	columns,
	data,
	selectedRows,
	onRowSelect,
	onCheckboxToggle,
}) => {
	const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
	const [filters, setFilters] = useState({});
	const [filterTypes, setFilterTypes] = useState({});
	const [activeFilterCol, setActiveFilterCol] = useState(null);
	const wrapperRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setActiveFilterCol(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSort = (key) => {
		let direction = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc')
			direction = 'desc';
		else if (sortConfig.key === key && sortConfig.direction === 'desc')
			direction = '';
		setSortConfig({ key, direction });
	};

	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const handleClearFilters = () => {
		setFilters({});
		setFilterTypes({});
		setActiveFilterCol(null);
	};

	const handleFilterOptionSelect = (colKey, option) => {
		setFilterTypes((prev) => ({ ...prev, [colKey]: option }));
		setActiveFilterCol(null);
	};

	const filteredAndSortedData = useMemo(() => {
		let rows = [...data];
		// Apply filters
		rows = rows.filter((row) => {
			return columns.every((col) => {
				const key = col.key;
				if (col.type === 'checkbox') return true;
				const filterVal = filters[key];
				if (!filterVal) return true;
				const type =
					filterTypes[key] || (col.type === 'number' ? 'Equals' : 'Contains');
				return col.type === 'number'
					? applyNumberFilter(row[key], filterVal, type)
					: applyTextFilter(row[key], filterVal, type);
			});
		});
		// Apply sort
		if (sortConfig.key && sortConfig.direction) {
			rows.sort((a, b) => {
				const aVal = a[sortConfig.key];
				const bVal = b[sortConfig.key];
				if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
				if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
				return 0;
			});
		}
		return rows;
	}, [data, filters, filterTypes, sortConfig, columns]);

	return (
		<div
			ref={wrapperRef}
			className='overflow-x-auto rounded-md border border-gray-300 relative'
		>
			<table className='min-w-full table-auto data-header'>
				<thead className='bg-white'>
					<tr>
						<th className='p-4 border text-center'>
							<input
								type='checkbox'
								onChange={(e) => onRowSelect('all', e.target.checked)}
							/>
						</th>
						{columns.map((col) => {
							const isSorted = sortConfig.key === col.key;
							return (
								<th
									key={col.key}
									className='p-2 text-left border whitespace-nowrap'
								>
									<div
										className='flex items-center justify-between cursor-pointer'
										onClick={() => handleSort(col.key)}
									>
										<span>{col.label}</span>
										<div className='ml-2'>
											{isSorted && sortConfig.direction === 'desc' ? (
												<img
													src={SortDown}
													alt='Sort Desc'
													className='w-4 h-4'
												/>
											) : (
												<img
													src={SortUp}
													alt='Sort Asc'
													className='w-4 h-4'
												/>
											)}
										</div>
									</div>
								</th>
							);
						})}
					</tr>
					<tr className='bg-gray-300'>
						<td
							className='p-4 text-blue-500 font-semibold border text-center cursor-pointer'
							onClick={handleClearFilters}
						>
							Clear
						</td>
						{columns.map((col) => (
							<td
								key={col.key}
								className='p-1 border relative'
							>
								{col.type !== 'checkbox' && (
									<div className='flex items-center gap-1'>
										<input
											type='text'
											value={filters[col.key] || ''}
											className='w-full border px-2 py-1 text-xs rounded'
											onChange={(e) =>
												handleFilterChange(col.key, e.target.value)
											}
										/>
										<div
											className='p-1 rounded cursor-pointer hover:bg-gray-300'
											onClick={() =>
												setActiveFilterCol(
													activeFilterCol === col.key ? null : col.key
												)
											}
										>
											<img
												src={Funnel}
												alt='Filter'
												className='w-6 h-6'
											/>
										</div>
										{activeFilterCol === col.key && (
											<ul className='absolute top-full right-5 bg-white rounded shadow-md z-10 text-sm max-h-52'>
												{(col.type === 'number'
													? numberFilterOptions
													: textFilterOptions
												).map((opt) => (
													<li
														key={opt}
														className='px-1 py-1 cursor-pointer hover:bg-gray-300'
														onClick={() =>
															handleFilterOptionSelect(col.key, opt)
														}
													>
														{opt}
													</li>
												))}
											</ul>
										)}
									</div>
								)}
							</td>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredAndSortedData.map((row) => {
						const isSelected = selectedRows.includes(row.id);
						return (
							<tr
								key={row.id}
								className={`border data-body group ${
									isSelected
										? 'text-white bg-primary-base'
										: 'hover:bg-primary-base hover:text-white'
								}`}
							>
								<td className='p-4 text-center border'>
									<input
										className={`${
											isSelected ? 'accent-white' : 'group-hover:accent-white'
										} `}
										type='checkbox'
										checked={isSelected}
										onChange={(e) => onRowSelect(row.id, e.target.checked)}
									/>
								</td>
								{columns.map((col) => (
									<td
										key={col.key}
										className='p-2 border text-center'
									>
										{col.type === 'checkbox' ? (
											<input
												type='checkbox'
												checked={row[col.key]}
												className={`${
													isSelected
														? 'accent-white'
														: 'group-hover:accent-white'
												} `}
												onChange={(e) =>
													onCheckboxToggle(row.id, col.key, e.target.checked)
												}
											/>
										) : (
											row[col.key]
										)}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MainTable;
