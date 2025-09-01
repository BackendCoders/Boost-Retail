/** @format */

import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import TrashIcon from '../../../assets/icons/thin/DeleteBinThinIcon'; // Replace with your trash icon
import Tooltip from '../../Ui/Tooltip/Tooltip';
import Table from './Table';
import { useSelector } from 'react-redux';
import TablePaginationBar from '../../Ui/Table/TablePaginationBar';
import { useState } from 'react';
import BottomTablePagination from '../../Ui/Table/BottomTablePagination';

export default function RowEditorTable({
	title,
	onChange,
	onDelete,
	onAdd,
	// selectedRows,
	// onRowSelect,
	// onCheckboxToggle,
}) {
	const { rowEditorTableData } = useSelector((state) => state.category);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const dynamicCols =
		Array.isArray(rowEditorTableData) && rowEditorTableData.length > 0
			? Object.keys(rowEditorTableData[0])
					.filter((key) => key !== 'id' && key !== 'active') // keep brand, model, category...
					.map((key) => ({
						label: key.charAt(0).toUpperCase() + key.slice(1),
						key,
						Cell: ({ row }) => (
							<div className='flex justify-center w-full'>
								<input
									type='text'
									className='border p-1 text-sm w-full text-black group-hover:text-black'
									value={row?.[key] ?? ''}
									onChange={(e) => onChange(row.id, key, e.target.value)}
								/>
							</div>
						),
					}))
			: [];

	console.log('Dynamic Columns:', dynamicCols);

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
							console.log('Checkbox toggled:', row.id, e.target.checked)
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
						placement='left'
						offset={[0, 10]}
					>
						<TrashIcon
							className='w-4 h-4 cursor-pointer opacity-70 group-hover:text-light'
							onClick={() => onDelete(row.id)}
						/>
					</Tooltip>
				</div>
			),
		},
	];

	return (
		<div>
			<div className='flex items-start justify-between'>
				<h2 className='font-semibold'>{title} Bikes</h2>
				{/* Add Button */}

				<Tooltip
					content='Add Row'
					placement='bottom'
					offset={[0, 10]}
				>
					<button
						onClick={onAdd}
						className='w-12 h-12 bg-primary hover:bg-secondary rounded text-light flex items-center justify-center'
					>
						<PlusIcon className='w-4 h-4' />
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
