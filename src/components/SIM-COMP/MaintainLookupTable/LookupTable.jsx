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
	setLookupTableDataRow,
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

	const onEdit = async (row) => {
		console.log('Edit row with id:', row);
		dispatch(setLookupTableDataRow(row));
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
							<button
								onClick={(e) => {
									onEdit(row);
									setShowModal(true);
									e.stopPropagation();
								}}
							>
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
							<button
								onClick={(e) => {
									onDelete(row.id);
									e.stopPropagation();
								}}
							>
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
			<div className='flex items-start justify-between mb-2'>
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
						className='px-4 py-4 rounded-full bg-primary hover:bg-secondary text-light flex items-center justify-center'
					>
						<PlusIcon className='w-6 h-6' />
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
