/** @format */

import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import TrashIcon from '../../../assets/icons/thin/DeleteBinThinIcon'; // Replace with your trash icon
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
						className='border p-1 text-sm w-full text-black group-hover:text-black'
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
						className='accent-primary-base group-hover:accent-light transition-colors'
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
						className='w-12 h-12 bg-primary-base hover:bg-primary-select rounded text-light flex items-center justify-center'
					>
						<PlusIcon className='w-4 h-4' />
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
