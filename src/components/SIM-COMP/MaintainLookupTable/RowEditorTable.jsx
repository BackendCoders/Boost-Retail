/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import TrashIcon from '../../../assets/icons/thin/DeleteBinThinIcon';
import Tooltip from '../../Ui/Tooltip/Tooltip';
import Table from './Table';
import TablePaginationBar from '../../Ui/Table/TablePaginationBar';
import {
	refreshAllRowEditorTableData,
	setRowEditorTableData,
} from '../../../slice/categorySlice';
import { deleteCategoryMaps } from '../../../services/operations/categoryApi';
import toast from 'react-hot-toast';
import SelectInput from '../../Ui/Input/SelectInput';
import { useCategoryOptions } from './useCategoryOptions';

const filterOptions = [
	{ label: 'Contains', value: 'contains' },
	{ label: 'Starts with', value: 'startsWith' },
	{ label: 'Equals', value: 'equals' },
	{ label: 'Ends with', value: 'endsWith' },
	{ label: 'Not contain', value: 'notContain' },
	{ label: 'Not equal', value: 'notEqual' },
];

const selectDropdownInput = ['category1', 'category2', 'category3'];

export default function RowEditorTable({ title, onChange, selectedTableId }) {
	const dispatch = useDispatch();
	const { rowEditorTableData, lookupTablesData } = useSelector(
		(state) => state.category
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const { categoryOptions, setSelectedCategories, selectedCategories } =
		useCategoryOptions();

	const selectedTableColumnsForFilter = lookupTablesData
		.find((t) => t.id === selectedTableId)
		?.supplierColumns.split(',')
		.map((col) => col.trim());

	console.log(
		'Selected Table Columns for Filter:',
		selectedTableColumnsForFilter
	);

	const handleCreateRow = (data) => {
		console.log('new data to send to Api', data);
	};

	const handleDeleteRow = async (row) => {
		if (!row.id && row.localId) {
			dispatch(
				setRowEditorTableData(
					rowEditorTableData.filter((data) => data.localId !== row.localId)
				)
			);
			return;
		}
		if (rowEditorTableData.length === 1) {
			toast.error('Atleast one row must be present');
			return;
		}
		try {
			const response = await deleteCategoryMaps(row.id);
			if (response.status === 'success') {
				dispatch(refreshAllRowEditorTableData(selectedTableId));
				toast.success('Row Deleted successfully');
			} else {
				toast.error('Failed to delete row');
			}
		} catch (error) {
			console.log('Error deleting row:', error);
		}
	};

	const dynamicCols =
		Array.isArray(rowEditorTableData) && rowEditorTableData.length > 0
			? Object.keys(rowEditorTableData[0])
					.filter(
						(key) => key !== 'id' && key !== 'active' && key !== 'localId'
					) // keep brand, model, category...
					.map((key, idx, arr) => ({
						label: key.charAt(0).toUpperCase() + key.slice(1),
						key,
						Cell: ({ row }) => {
							const isSelectColumn =
								selectedTableColumnsForFilter?.includes(key);
							const isSelect = selectDropdownInput?.includes(key);
							return (
								<div className='flex justify-center w-full gap-2'>
									{isSelectColumn && (
										<>
											<div className='min-w-[10rem] max-w-[12rem]'>
												<SelectInput
													options={filterOptions}
													placeholder='Choose'
													// value={
													// 	filterOptions.find(
													// 		(option) => option.value === field.value
													// 	) || null
													// }
													// onChange={(selected) =>
													// 	field.onChange(selected ? selected.value : null)
													// }
													// className='w-[20rem] min-w-[8rem]'
													inTable={true}
												/>
											</div>
										</>
									)}
									{isSelect ? (
										<div className='min-w-[10rem] max-w-[12rem]'>
											<SelectInput
												options={categoryOptions[key] || []}
												value={
													categoryOptions[key]?.find(
														(opt) => opt.value === selectedCategories[key]
													) || null
												}
												onChange={(selected) => {
													setSelectedCategories((prev) => ({
														...prev,
														[key]: selected ? selected.value : null,
													}));
												}}
												placeholder='Choose'
												inTable={true}
											/>
										</div>
									) : (
										<input
											type='text'
											className='border p-2 text-sm flex-1 rounded-md text-black group-hover:text-black'
											value={row?.[key] ?? ''}
											onChange={(e) =>
												onChange(row.id ?? row?.localId, key, e.target.value)
											}
											onBlur={() => {
												// last input Enter → call create API
												if (idx === arr.length - 1 && !row.id) {
													handleCreateRow(row);
												}
											}}
										/>
									)}
								</div>
							);
						},
					}))
			: [];

	console.log('Dynamic Columns:', dynamicCols);

	const handleAddRow = () => {
		if (!rowEditorTableData || rowEditorTableData.length === 0) {
			// fallback empty row
			const emptyRow = { localId: Date.now(), active: false };
			dispatch(setRowEditorTableData([emptyRow]));
			return;
		}

		// Get all keys dynamically from first row
		const keys = Object.keys(rowEditorTableData[0]).filter(
			(key) => key !== 'id' && key !== 'localId'
		);

		const newRow = keys.reduce(
			(acc, key) => {
				if (key === 'active') {
					acc[key] = false;
				} else {
					acc[key] = '';
				}
				return acc;
			},
			{ localId: Date.now() } // generate unique ID
		);

		// Prepend the new row at the top
		dispatch(setRowEditorTableData([newRow, ...rowEditorTableData]));
	};

	const columns = [
		{
			label: 'ID',
			key: 'id',
		},
		...dynamicCols,
		{
			label: 'Active',
			key: 'active',
			type: 'checkbox',
			Cell: ({ row }) => (
				<div className='flex justify-center'>
					<input
						type='checkbox'
						checked={row?.active}
						defaultValue={true}
						onChange={(e) =>
							onChange(row.id ?? row.localId, 'active', e.target.checked)
						}
						className='accent-primary group-hover:accent-light transition-colors'
					/>
				</div>
			),
		},
		{
			label: 'Delete',
			key: 'delete',
			type: 'checkbox',
			Cell: ({ row }) => (
				<div className='flex justify-center'>
					<Tooltip
						content='Delete Row'
						placement='bottom'
						offset={[0, 10]}
					>
						<button
							onClick={() => handleDeleteRow(row)}
							disabled={rowEditorTableData.length === 1}
						>
							<TrashIcon
								className={`w-4 h-4 opacity-70 group-hover:text-light ${
									rowEditorTableData.length === 1
										? 'cursor-not-allowed'
										: 'cursor-pointer'
								}`}
							/>
						</button>
					</Tooltip>
				</div>
			),
		},
	];

	return (
		<div>
			<div className='flex items-start justify-between mb-2'>
				<h2 className='font-semibold'>{title} Bikes</h2>
				{/* Add Button */}

				<Tooltip
					content='Add Row'
					placement='bottom'
					offset={[0, 10]}
				>
					<button
						onClick={handleAddRow}
						className='px-4 py-4 rounded-full bg-primary hover:bg-secondary text-light flex items-center justify-center'
					>
						<PlusIcon className='w-6 h-6' />
					</button>
				</Tooltip>
			</div>

			<Table
				columns={columns}
				data={rowEditorTableData}
				enableRowSelection={false}
				currentPage={currentPage}
				itemsPerPage={perPage}
			/>

			<TablePaginationBar
				currentPage={currentPage}
				totalPages={100}
				productsPerPage={perPage}
				onPageChange={(dir) =>
					setCurrentPage((p) =>
						dir === 'prev' ? Math.max(p - 1, 1) : Math.min(p + 1, 100)
					)
				}
				onPerPageChange={setPerPage}
				isSettingFilter={false}
				// availableColumns={allLabels}
				// selectedColumns={selectedColumns}
				// onColumnsChange={setSelectedColumns}
			/>
		</div>
	);
}
