/** @format */
import { useState, useRef, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
	onRowSelect,
	onRowClick,
	onCheckboxToggle,
	enableRowSelection = true,
	showFilterRow = true,
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

	return (
		<div
			ref={wrapperRef}
			className='overflow-x-auto rounded-md border border-gray-300 relative'
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
											<input
												type='checkbox'
												onChange={(e) => onRowSelect?.('all', e.target.checked)}
											/>
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
													className={`p-2 text-left border whitespace-nowrap bg-white ${
														snapshot.isDragging ? 'shadow-md' : ''
													}`}
												>
													<div
														className='flex items-center justify-between cursor-pointer'
														onClick={() => handleSort(col.key)}
													>
														<span>{col.label}</span>
														<img
															src={
																sortConfig.key === col.key &&
																sortConfig.direction === 'desc'
																	? SortDown
																	: SortUp
															}
															alt='Sort'
															className='w-4 h-4 ml-2'
														/>
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
						<tr className='bg-gray-300'>
							{enableRowSelection && <td className='p-4 border'></td>}
							{columnsState.map((col, index) => (
								<td
									key={col.key}
									className='p-2 border relative'
								>
									{index === 0 ? (
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
										)
									)}
								</td>
							))}
						</tr>
					)}
				</thead>
				<tbody>
					{filteredAndSortedData.map((row) => {
						const isSelected = selectedRow === row.id;
						return (
							<tr
								key={row.id}
								onClick={() => {
									console.log('Row clicked:', row.id);
									onRowClick?.(row.id);
								}}
								className={`border data-body cursor-pointer group ${
									isSelected
										? 'bg-primary-base text-white'
										: 'hover:bg-primary-base hover:text-white'
								}`}
							>
								{enableRowSelection && (
									<td className='p-4 text-center border'>
										<input
											className={`${
												isSelected ? 'accent-white' : 'group-hover:accent-white'
											}`}
											type='checkbox'
											checked={isSelected}
											onChange={(e) => onRowSelect?.(row.id, e.target.checked)}
										/>
									</td>
								)}
								{columnsState.map((col) => (
									<td
										key={col.key}
										className='p-2 border text-center text-black group-hover:text-black'
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
														? 'accent-white'
														: 'group-hover:accent-white'
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
