/** @format */
import { useState, useRef } from 'react';
import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import EditIcon from '../../../assets/icons/line/EditPenIcon';
import TrashIcon from '../../../assets/icons/thin/DeleteBinThinIcon'; // Replace with your trash icon
import Table from './Table';
import Tooltip from '../../Ui/Tooltip/Tooltip';
import AddLookupModal from './AddLookupModal';

export default function LookupTable({
	lookupTables,
	selectedTableId,
	setSelectedTableId,
}) {
	const [showModal, setShowModal] = useState(false);
	const highLightRef = useRef(null);
	const plusButtonRef = useRef(null);

	const handleRowClick = (id) => {
		highLightRef.current = id;
		setSelectedTableId(id);
	};

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
			Cell: ({ row }) => (
				<div
					className={`flex items-center ${
						row.id === highLightRef?.current
							? 'text-light'
							: 'text-text-body group-hover:text-light'
					}`}
				>
					{row?.columns?.join(', ')}
				</div>
			),
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
			Cell: ({ row }) => {
				return (
					<div className='flex justify-center items-center space-x-2 gap-2'>
						<Tooltip
							content='Edit Row'
							placement='left'
							offset={[0, 10]}
						>
							<EditIcon
								className={`w-4 h-4 cursor-pointer ${
									row.id === highLightRef?.current
										? 'text-light'
										: 'text-text-body group-hover:text-light'
								}`}
								// onClick={() => onEdit(row.id)}
							/>
						</Tooltip>

						<Tooltip
							content='Delete Row'
							placement='left'
							offset={[0, 10]}
						>
							<TrashIcon
								className={`w-4 h-4 cursor-pointer ${
									row.id === highLightRef?.current
										? 'text-light'
										: 'text-text-body group-hover:text-light'
								}`}
								// onClick={() => onDelete(row.id)}
							/>
						</Tooltip>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<div className='flex items-start justify-between'>
				<h2 className='font-semibold'>Create Lookup Tables</h2>
				{/* Add Button */}

				<Tooltip
					content='Add Row'
					placement='bottom'
					offset={[0, 10]}
				>
					<button
						ref={plusButtonRef}
						onClick={() => setShowModal(true)}
						className='w-12 h-12 bg-primary hover:bg-secondary rounded text-light flex items-center justify-center'
					>
						<PlusIcon className='w-4 h-4' />
					</button>
				</Tooltip>
			</div>

			<Table
				columns={columns}
				data={lookupTables}
				enableRowSelection={false}
				onRowClick={handleRowClick}
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
