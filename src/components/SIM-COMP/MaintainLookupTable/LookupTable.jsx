/** @format */
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import EditIcon from '../../../assets/icons/line/EditPenIcon';
import TrashIcon from '../../../assets/icons/thin/DeleteBinThinIcon'; // Replace with your trash icon
import Table from './Table';
import Tooltip from '../../Ui/Tooltip/Tooltip';
import AddLookupModal from './AddLookupModal';
import {
	refreshAllLookupTablesData,
	supplierFeedsOptions,
} from '../../../slice/categorySlice';
import { deleteCategoryLookupAsync } from '../../../services/operations/categoryApi';

export default function LookupTable({
	lookupTables,
	selectedTableId,
	setSelectedTableId,
}) {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const highLightRef = useRef(null);
	const plusButtonRef = useRef(null);

	const handleRowClick = (id) => {
		highLightRef.current = id;
		setSelectedTableId(id);
	};

	const onDelete = async (id) => {
		console.log('Delete row with id:', id);
		try {
			const response = await deleteCategoryLookupAsync(id);
			console.log('Delete response:', response);
			if (response) {
				dispatch(refreshAllLookupTablesData());
			}
		} catch (error) {
			console.error('Error deleting category lookup:', error);
		}
	};

	const onEdit = async (id) => {
		console.log('Edit row with id:', id);
	};

	const columns = [
		{
			label: 'Table Name',
			key: 'tableName',
		},
		{
			label: 'Supplier Feed',
			key: 'supplierFeed',
			Cell: ({ row }) => (
				<div
					className={`flex items-center justify-center ${
						row.id === highLightRef?.current
							? 'text-light'
							: 'text-text-body group-hover:text-light'
					}`}
				>
					{row?.supplierFeed
						? supplierFeedsOptions.find((opt) => opt.value === row.supplierFeed)
								?.label
						: ''}
				</div>
			),
		},
		{
			label: 'Columns',
			key: 'supplierColumns',
			Cell: ({ row }) => (
				<div
					className={`flex items-center justify-center ${
						row.id === highLightRef?.current
							? 'text-light'
							: 'text-text-body group-hover:text-light'
					}`}
				>
					{row?.supplierColumns}
				</div>
			),
		},
		{
			label: 'Categorization',
			key: 'categorisation',
		},
		{
			label: 'Active',
			key: 'isActive',
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
							placement='bottom'
							offset={[0, 10]}
						>
							<button onClick={() => onEdit(row.id)}>
								<EditIcon
									className={`w-4 h-4 cursor-pointer ${
										row.id === highLightRef?.current
											? 'text-light'
											: 'text-text-body group-hover:text-light'
									}`}
								/>
							</button>
						</Tooltip>

						<Tooltip
							content='Delete Row'
							placement='bottom'
							offset={[0, 10]}
						>
							<button onClick={() => onDelete(row.id)}>
								<TrashIcon
									className={`w-4 h-4 cursor-pointer ${
										row.id === highLightRef?.current
											? 'text-light'
											: 'text-text-body group-hover:text-light'
									}`}
								/>
							</button>
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
