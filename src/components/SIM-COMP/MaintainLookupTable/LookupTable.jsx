/** @format */
import { useState, useRef } from 'react';
import PlusIcon from '../../../assets/whitesvgicons/Plus-Large-Thin.svg';
import EditIcon from '../../../assets/svgIcons/edit.svg';
import TrashIcon from '../../../assets/svgIcons/Delete-Bin-Thin.svg'; // Replace with your trash icon
import Table from './Table';
import Tooltip from '../../Ui/Tooltip/Tooltip';
import AddLookupModal from './AddLookupModal';

export default function LookupTable({
	lookupTables,
	selectedTableId,
	setSelectedTableId,
}) {
	const [showModal, setShowModal] = useState(false);
	const plusButtonRef = useRef(null);

	const columns = [
		{
			label: 'Table Name',
			key: 'tableName',
		},
		{
			label: 'Supplier Feed',
			key: 'supplier',
		},
		{
			label: 'Columns',
			key: 'columns',
		},
		{
			label: 'Categorization',
			key: 'categorisation',
		},
		{
			label: 'Active',
			key: 'active',
			type: 'checkbox',
		},
		{
			label: 'Action',
			key: 'action',
			type: 'checkbox',
			Cell: ({ row }) => (
				<div className='flex justify-center items-center space-x-2 gap-2'>
					<Tooltip
						content='Edit Row'
						placement='left'
						offset={[0, 10]}
					>
						<img
							src={EditIcon}
							alt='Delete'
							className='w-4 h-4 cursor-pointer opacity-70 hover:opacity-100'
							// onClick={() => onEdit(row.id)}
						/>
					</Tooltip>

					<Tooltip
						content='Delete Row'
						placement='left'
						offset={[0, 10]}
					>
						<img
							src={TrashIcon}
							alt='Delete'
							className='w-4 h-4 cursor-pointer opacity-70 hover:opacity-100'
							// onClick={() => onDelete(row.id)}
						/>
					</Tooltip>
				</div>
			),
		},
	];

	console.log('LookupTable rendered with selectedTableId:', selectedTableId);
	return (
		<div>
			<div className='flex items-center justify-between'>
				<h2 className='p-2 font-semibold'>Create Lookup Tables</h2>
				{/* Add Button */}

				<Tooltip
					content='Add Row'
					placement='bottom'
					offset={[0, 10]}
				>
					<button
						ref={plusButtonRef}
						onClick={() => setShowModal(true)}
						className='w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded text-white flex items-center justify-center'
					>
						<img src={PlusIcon} alt='Add Row' className='w-4 h-4' />
					</button>
				</Tooltip>
			</div>

			<Table
				columns={columns}
				data={lookupTables}
				enableRowSelection={false}
				onRowClick={setSelectedTableId}
				selectedRow={selectedTableId}
				showFilterRow={false}
			/>

			{/* Modal */}
			<AddLookupModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				anchorRef={plusButtonRef}
			/>
		</div>
	);
}
