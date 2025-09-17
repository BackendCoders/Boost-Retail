/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import TrashIcon from '../../../assets/icons/thin/DeleteBinThinIcon';
import Tooltip from '../../Ui/Tooltip/Tooltip';
import Table from './Table';
import TablePaginationBar from '../../Ui/Table/TablePaginationBar';
import { setRowEditorTableData } from '../../../slice/categorySlice';

export default function RowEditorTable({ title, onChange }) {
	const dispatch = useDispatch();
	const { rowEditorTableData } = useSelector((state) => state.category);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const handleCreateRow = (data) => {
		console.log('new data to send to Api', data);
	};

	const handleDeleteRow = (id) => {
		console.log('Delete row with id:', id);
		// dispatch(
		// 	setRowEditorTableData(
		// 		rowEditorTableData.filter((row) => row.id ?? row?.localId !== id)
		// 	)
		// );
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
							return (
								<div className='flex justify-center w-full'>
									<input
										type='text'
										className='border p-1 text-sm w-full text-black group-hover:text-black'
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
						<button onClick={() => handleDeleteRow(row.id ?? row.localId)}>
							<TrashIcon className='w-4 h-4 cursor-pointer opacity-70 group-hover:text-light' />
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
