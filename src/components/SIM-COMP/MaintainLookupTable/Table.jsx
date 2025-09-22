/** @format */
import { useState, useRef, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import SortUp from '../../../assets/icons/thin/SortUpThinIcon';
import SortDown from '../../../assets/icons/thin/SortDownThinIcon';
import Funnel from '../../../assets/icons/thin/FunnelThinIcon';

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
	const val = String(value ?? '')?.toLowerCase();
	const filt = String(filterValue ?? '')?.toLowerCase();
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

const Table = ({
	columns,
	data,
	selectedRow = 0,
	selectedRows = [],
	onRowSelect,
	onMultiSelect,
	onRowClick,
	onCheckboxToggle,
	enableRowSelection = true,
	enableMultiSelect = true,
	showFilterRow = true,
	currentPage = 1,
	itemsPerPage = 10,
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

	useEffect(() => {
		setColumnsState(columns);
	}, [columns]);

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

	const handleMultiSelect = (rowId, isSelected) => {
		if (!enableMultiSelect) return;

		let newSelectedRows = [...selectedRows];
		if (isSelected) {
			newSelectedRows.push(rowId);
		} else {
			newSelectedRows = newSelectedRows.filter((id) => id !== rowId);
		}
		onMultiSelect?.(newSelectedRows);
	};

	// Handle select all checkbox
	const handleSelectAll = (isSelected) => {
		if (!enableMultiSelect) return;

		const newSelectedRows = isSelected
			? filteredAndSortedData.map((row) => row.id)
			: [];
		onMultiSelect?.(newSelectedRows);
	};

	const filteredAndSortedData = useMemo(() => {
		let rows = [...data];
		rows = showFilterRow
			? rows.filter((row) => {
					return columnsState.every((col) => {
						const key = col.key;
						if (col.type === 'checkbox') return true;
						const filterVal = filters[key];
						if (!filterVal) return true;
						const type =
							filterTypes[key] ||
							(col.type === 'number' ? 'Equals' : 'Contains');
						return col.type === 'number'
							? applyNumberFilter(row[key], filterVal, type)
							: applyTextFilter(row[key], filterVal, type);
					});
			  })
			: rows;
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
	}, [
		data,
		showFilterRow,
		sortConfig.key,
		sortConfig.direction,
		columnsState,
		filters,
		filterTypes,
	]);

	const paginatedData = useMemo(() => {
		if (!itemsPerPage) return filteredAndSortedData;

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredAndSortedData.slice(startIndex, endIndex);
	}, [filteredAndSortedData, currentPage, itemsPerPage]);

	return (
		<div
			ref={wrapperRef}
			className='overflow-x-auto rounded-md border border-gray-60 relative'
		>
			<table className='min-w-full table-auto data-header'>
				<thead className='bg-white'>
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
									{enableRowSelection && (
										<th className='p-4 border text-center'>
											{enableMultiSelect ? (
												<input
													type='checkbox'
													checked={
														selectedRows.length ===
															filteredAndSortedData.length &&
														filteredAndSortedData.length > 0
													}
													onChange={(e) => handleSelectAll(e.target.checked)}
												/>
											) : (
												<input
													type='checkbox'
													onChange={(e) =>
														onRowSelect?.('all', e.target.checked)
													}
												/>
											)}
										</th>
									)}
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
													className={`p-4 text-left border whitespace-nowrap ${
														snapshot.isDragging ? 'shadow-md' : ''
													}`}
												>
													<div
														className='flex items-center justify-between cursor-pointer'
														onClick={() => handleSort(col.key)}
													>
														<span>{col.label}</span>
														{sortConfig.key === col.key &&
														sortConfig.direction === 'desc'
															? col.type !== 'checkbox' && (
																	<SortDown className='w-4 h-4 ml-2' />
															  )
															: col.type !== 'checkbox' && (
																	<SortUp className='w-4 h-4 ml-2' />
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

					{showFilterRow && (
						<tr className='bg-light'>
							{enableRowSelection && (
								<td className='p-4 border'>
									<div
										className='text-blue-500 font-semibold text-center cursor-pointer'
										onClick={handleClearFilters}
									>
										Clear
									</div>
								</td>
							)}
							{columnsState.map((col, index) => (
								<td
									key={col.key}
									className='p-4 border relative'
								>
									{index === 0 && !enableRowSelection ? (
										<div
											className='text-blue-500 font-semibold text-center cursor-pointer'
											onClick={handleClearFilters}
										>
											Clear
										</div>
									) : (
										col.type !== 'checkbox' && (
											<div className='flex items-center gap-1'>
												<input
													type='text'
													value={filters[col.key] || ''}
													className='w-full border px-2 py-2 text-xs rounded'
													onChange={(e) =>
														handleFilterChange(col.key, e.target.value)
													}
												/>
												<div
													className='p-1 rounded cursor-pointer'
													onClick={() =>
														setActiveFilterCol(
															activeFilterCol === col.key ? null : col.key
														)
													}
												>
													<Funnel className='w-6 h-6 text-gray-300' />
												</div>
												{activeFilterCol === col.key && (
													<>
														<div className='absolute top-full right-5 bg-white border border-gray-60 rounded shadow-md z-10 text-sm max-h-52 max-w-48 p-2'>
															<p className='text-sm font-bold mb-2 text-[#555]'>
																Filter mode
															</p>
															<ul className=''>
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
														</div>
													</>
												)}
											</div>
										)
									)}
								</td>
							))}
						</tr>
					)}
				</thead>
				<tbody>
					{paginatedData.map((row) => {
						const isSelected = selectedRow === row.id;
						const isMultiSelected = selectedRows.includes(row.id);
						return (
							<tr
								key={row.id}
								onClick={() => {
									onRowClick?.(row.id);
								}}
								className={`border data-body cursor-pointer group ${
									isSelected
										? 'bg-primary text-light'
										: 'hover:bg-primary hover:text-light'
								}`}
							>
								{enableRowSelection && (
									<td
										className='p-4 text-center border'
										onClick={(e) => e.stopPropagation()}
									>
										<input
											className={`${
												isSelected || !isMultiSelected
													? 'accent-light'
													: 'group-hover:accent-light'
											}`}
											type='checkbox'
											checked={isMultiSelected}
											onChange={(e) =>
												handleMultiSelect(row.id, e.target.checked)
											}
										/>
									</td>
								)}
								{columnsState.map((col) => (
									<td
										key={col.key}
										className='p-4 border text-center'
									>
										{col.Cell ? (
											col.Cell({ row, value: row[col.key] })
										) : col.type === 'checkbox' ? (
											<input
												type='checkbox'
												checked={row[col.key]}
												onChange={(e) =>
													onCheckboxToggle?.(row.id, col.key, e.target.checked)
												}
												className={`${
													isSelected
														? 'accent-light'
														: 'group-hover:accent-light'
												}`}
											/>
										) : (
											row[col.key] ?? '-'
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

export default Table;
