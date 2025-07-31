/** @format */

import { useState, useRef, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import SortUpIcon from '../../../assets/icons/thin/SortUpThinIcon.jsx';
import SortDownIcon from '../../../assets/icons/thin/SortDownThinIcon.jsx';
import FunnelIcon from '../../../assets/icons/thin/FunnelThinIcon.jsx';

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
	const val = String(value)?.toLowerCase();
	const filt = String(filterValue)?.toLowerCase();
	switch (type) {
		case 'Contains':
			return val?.includes(filt);
		case 'Starts with':
			return val?.startsWith(filt);
		case 'Equals':
			return val === filt;
		case 'Ends with':
			return val?.endsWith(filt);
		case 'Not contain':
			return !val?.includes(filt);
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
	const [columnsState, setColumnsState] = useState(columns);

	const handleDragEnd = (result) => {
		const { source, destination } = result;
		if (!destination || source.index === destination.index) return;

		const reordered = Array.from(columnsState);
		const [moved] = reordered.splice(source.index, 1);
		reordered.splice(destination.index, 0, moved);

		setColumnsState(reordered);
	};

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
			className='overflow-x-auto rounded-md border border-border-grid relative'
		>
			<table className='min-w-full table-auto data-header'>
				<thead className='bg-light'>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable
							droppableId='columns'
							direction='horizontal'
						>
							{(provided) => (
								<tr
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<th className='p-4 border text-center'>
										<input
											type='checkbox'
											onChange={(e) => onRowSelect('all', e.target.checked)}
										/>
									</th>
									{columnsState.map((col, index) => (
										<Draggable
											key={col.key}
											draggableId={col.key}
											index={index}
										>
											{(provided, snapshot) => (
												<th
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className={`p-2 text-left border lightspace-nowrap bg-light ${
														snapshot.isDragging ? 'shadow-md' : ''
													}`}
												>
													<div
														className='flex items-center justify-between cursor-pointer'
														onClick={() => handleSort(col.key)}
													>
														<span>{col.label}</span>
														{sortConfig.key === col.key &&
														sortConfig.direction === 'desc' ? (
															<SortDownIcon className='w-4 h-4 ml-2' />
														) : (
															<SortUpIcon className='w-4 h-4 ml-2' />
														)}
													</div>
												</th>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</tr>
							)}
						</Droppable>
					</DragDropContext>

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
											<FunnelIcon className='w-6 h-6' />
										</div>

										{activeFilterCol === col.key && (
											<ul className='absolute top-full right-5 bg-light rounded shadow-md z-10 text-sm max-h-52'>
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
						const isSelected = selectedRows?.includes(row.id);
						return (
							<tr
								key={row.id}
								className={`border data-body group ${
									isSelected
										? 'text-light bg-primary-base'
										: 'hover:bg-primary-base hover:text-light'
								}`}
							>
								<td className='p-4 text-center border'>
									<input
										className={`${
											isSelected ? 'accent-light' : 'group-hover:accent-light'
										} `}
										type='checkbox'
										checked={isSelected}
										onChange={(e) => onRowSelect(row.id, e.target.checked)}
									/>
								</td>
								{columnsState.map((col) => (
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
														? 'accent-light'
														: 'group-hover:accent-light'
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
