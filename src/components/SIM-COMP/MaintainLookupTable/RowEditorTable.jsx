/** @format */

import PlusIcon from '../../../assets/whitesvgicons/Plus-Large-Thin.svg';
import TrashIcon from '../../../assets/svgIcons/Delete-Bin-Thin.svg'; // Replace with your trash icon
import Tooltip from '../../Ui/Tooltip/Tooltip';
import Table from './Table';

export default function RowEditorTable({
	title,
	rows,
	onChange,
	onDelete,
	onAdd,
	dynamicColumns,
	// selectedRows,
	// onRowSelect,
	// onCheckboxToggle,
}) {
	const dynamicCols =
		dynamicColumns?.map((col) => ({
			label: col,
			key: col.toLowerCase().replace(/\s+/g, ''),
			Cell: ({ row, value }) => (
				<div className='flex justify-center w-full'>
					<input
						className='border p-1 text-sm w-full'
						value={value}
						onChange={(e) =>
							onChange(
								row.id,
								col.toLowerCase().replace(/\s+/g, ''),
								e.target.value
							)
						}
					/>
				</div>
			),
		})) || [];

	console.log('Dynamic Columns:', { dynamicCols, rows });

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
						<img
							src={TrashIcon}
							alt='Delete'
							className='w-4 h-4 cursor-pointer opacity-70 hover:opacity-100'
							onClick={() => onDelete(row.id)}
						/>
					</Tooltip>
				</div>
			),
		},
	];

	return (
		<div>
			<div className='flex items-center justify-between'>
				<h2 className='p-2 font-semibold'>{title} Bikes</h2>
				{/* Add Button */}

				<Tooltip
					content='Add Row'
					placement='bottom'
					offset={[0, 10]}
				>
					<button
						onClick={onAdd}
						className='w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded text-white flex items-center justify-center'
					>
						<img
							src={PlusIcon}
							alt='Add Row'
							className='w-4 h-4'
						/>
					</button>
				</Tooltip>
			</div>

			<Table
				columns={columns}
				data={rows}
				enableRowSelection={false}
			/>
		</div>
	);
}
