/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import TrashIcon from '../../../assets/icons/thin/DeleteBinThinIcon';
import Tooltip from '../../Ui/Tooltip/Tooltip';
import Table from './Table';
import TablePaginationBar from '../../Ui/Table/TablePaginationBar';
import {
	refreshAllRowEditorTableData,
	setRowEditorTableData,
} from '../../../slice/categorySlice';
import {
	deleteCategoryMaps,
	saveCategoryMaps,
} from '../../../services/operations/categoryApi';
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

	const { categoryOptions, setSelectedCategories } = useCategoryOptions();

	const selectedTableColumnsForFilter = lookupTablesData
		.find((t) => t.id === selectedTableId)
		?.supplierColumns.split(',')
		.map((col) => col.trim());

	const handleCreateRow = async (row) => {
		console.log('Payload to send:', row);
		// let tableId = 0;
		try {
			const response = await saveCategoryMaps(row, selectedTableId);
			console.log('Response from saveCategoryMaps:', response);
		} catch (error) {
			console.log('Error creating row:', error);
		}
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

	const handleAddRow = () => {
		if (!rowEditorTableData || rowEditorTableData.length === 0) {
			// fallback empty row with no dynamicProperties
			const emptyRow = {
				localId: Date.now(),
				dynamicProperties: [],
			};
			dispatch(setRowEditorTableData([emptyRow]));
			return;
		}

		// Take dynamicProperties definition from the first row
		const templateProps = rowEditorTableData[0]?.dynamicProperties || [];

		// Build new dynamicProperties with empty/default values
		const newDynamicProperties = templateProps?.map((prop) => ({
			...prop,
			value: prop.columnType === 2 ? false : '', // default boolean -> false, else empty string
			filter: '',
		}));

		const newRow = {
			localId: Date.now(), // unique local ID
			dynamicProperties: newDynamicProperties,
		};

		// Prepend new row at top
		dispatch(setRowEditorTableData([newRow, ...rowEditorTableData]));
	};

	console.log('Row Editor Table Data:', rowEditorTableData);

	const dynamicCols =
		Array.isArray(rowEditorTableData) && rowEditorTableData.length > 0
			? rowEditorTableData[0]?.dynamicProperties?.map((prop, idx, arr) => {
					const rawKey = prop.columnName.trim();
					const formattedKey = rawKey.charAt(0).toUpperCase() + rawKey.slice(1);
					const normalizedKey = rawKey.toLowerCase().replace(/\s+/g, '');
					return {
						label: formattedKey,
						rawKey,
						Cell: ({ row }) => {
							const prop = row.dynamicProperties.find(
								(p) => p.columnName.trim() === rawKey
							);

							// Value for text, category, or filter
							const currentValue = prop?.value ?? '';
							const currentFilter = prop?.filter ?? '';
							const currentColumnType = prop?.columnType ?? 0;
							const isSelectColumn =
								selectedTableColumnsForFilter?.includes(rawKey);
							const isSelect = selectDropdownInput?.includes(normalizedKey);
							return (
								<div className='flex justify-center w-full gap-2'>
									{isSelectColumn && (
										<>
											<div className='min-w-[10rem] max-w-[12rem]'>
												<SelectInput
													options={filterOptions}
													placeholder='Choose'
													inTable={true}
													value={
														filterOptions.find(
															(opt) => opt.value === currentFilter || null
														) || null
													}
													onChange={(selected) => {
														// update filter value in that property
														onChange(row.id ?? row?.localId, rawKey, {
															...prop,
															filter: selected ? selected.value : null,
														});
													}}
												/>
											</div>
										</>
									)}
									{isSelect ? (
										<div className='min-w-[10rem] max-w-[12rem]'>
											<SelectInput
												options={categoryOptions[normalizedKey] || []}
												value={
													categoryOptions[normalizedKey]?.find(
														(opt) => opt.value === currentValue
													) || null
												}
												onChange={(selected) => {
													onChange(row.id ?? row?.localId, rawKey, {
														...prop,
														value: selected ? selected.value : null,
													});
													setSelectedCategories((prev) => ({
														...prev,
														[normalizedKey]: selected?.value ?? '',
													}));
												}}
												placeholder='Choose'
												inTable={true}
											/>
										</div>
									) : currentColumnType === 2 ? (
										<input
											type='checkbox'
											className='accent-primary group-hover:accent-light transition-colors'
											checked={currentValue}
											onChange={(e) =>
												onChange(row.id ?? row?.localId, rawKey, {
													...prop,
													value: e.target.checked,
												})
											}
											onBlur={() => {
												if (idx === arr.length - 1) {
													handleCreateRow(row);
												}
											}}
										/>
									) : (
										<input
											type='text'
											className='border p-2 text-sm flex-1 rounded-md text-black group-hover:text-black'
											value={currentValue}
											onChange={(e) =>
												onChange(row.id ?? row?.localId, rawKey, {
													...prop,
													value: e.target.value,
												})
											}
											onBlur={() => {
												if (idx === arr.length - 1) {
													handleCreateRow(row);
												}
											}}
										/>
									)}
								</div>
							);
						},
					};
			  })
			: [];

	const columns = [
		{
			label: 'ID',
			key: 'id',
		},
		...dynamicCols,
		// {
		// 	label: 'Active',
		// 	key: 'active',
		// 	type: 'checkbox',
		// 	Cell: ({ row }) => (
		// 		<div className='flex justify-center'>
		// 			<input
		// 				type='checkbox'
		// 				checked={row?.active}
		// 				defaultValue={true}
		// 				onChange={(e) =>
		// 					onChange(row.id ?? row.localId, 'active', e.target.checked)
		// 				}
		// 				className='accent-primary group-hover:accent-light transition-colors'
		// 			/>
		// 		</div>
		// 	),
		// },
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
