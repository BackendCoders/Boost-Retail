/** @format */

import Tooltip from '../../Ui/Tooltip/Tooltip';
import Table from '../MaintainLookupTable/Table';
import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import TrashIcon from '../../../assets/icons/thin/DeleteBinThinIcon';
import { useRef } from 'react';
export default function SupplierFeedsTable({
	supplierFeeds,
	onChange,
	onDelete,
	onAdd,
	selectedFeedId,
	setSelectedFeedId,
}) {
	const highLightRef = useRef(null);

	const handleRowClick = (id) => {
		highLightRef.current = id;
		setSelectedFeedId(id);
	};

	const columns = [
		{ label: 'ID', key: 'id' },
		{
			label: 'Supplier',
			key: 'supplier',
			Cell: ({ row, value }) => (
				<input
					className='border p-1 text-sm w-full text-black group-hover:text-black'
					value={value}
					onChange={(e) => onChange(row.id, 'supplier', e.target.value)}
				/>
			),
		},
		{
			label: 'Feed Name',
			key: 'feedName',
			Cell: ({ row, value }) => (
				<input
					className='border p-1 text-sm w-full text-black group-hover:text-black'
					value={value}
					onChange={(e) => onChange(row.id, 'feedName', e.target.value)}
				/>
			),
		},
		{
			label: 'Feed Address',
			key: 'feedAddress',
			Cell: ({ row, value }) => (
				<input
					className='border p-1 text-sm w-full text-black group-hover:text-black'
					value={value}
					onChange={(e) => onChange(row.id, 'feedAddress', e.target.value)}
				/>
			),
		},
		{
			label: 'API Key',
			key: 'apiKey',
			Cell: ({ row, value }) => (
				<input
					className='border p-1 text-sm w-full text-black group-hover:text-black'
					value={value}
					onChange={(e) => onChange(row.id, 'apiKey', e.target.value)}
				/>
			),
		},
		{
			label: 'Username',
			key: 'username',
			Cell: ({ row, value }) => (
				<input
					className='border p-1 text-sm w-full text-black group-hover:text-black'
					value={value}
					onChange={(e) => onChange(row.id, 'username', e.target.value)}
				/>
			),
		},
		{
			label: 'Password',
			key: 'password',
			Cell: ({ row, value }) => (
				<input
					className='border p-1 text-sm w-full text-black group-hover:text-black'
					value={value}
					onChange={(e) => onChange(row.id, 'password', e.target.value)}
				/>
			),
		},
		{
			label: 'Active',
			key: 'active',
			type: 'checkbox',
			Cell: ({ row, value }) => (
				<div className='flex justify-center'>
					<input
						type='checkbox'
						checked={value}
						onChange={(e) => onChange(row.id, 'active', e.target.checked)}
						className={` ${
							row.id === highLightRef.current
								? 'accent-white'
								: 'accent-primary-base group-hover:accent-white'
						} transition-colors`}
					/>
				</div>
			),
		},
		{
			label: 'Delete',
			key: 'delete',
			type: 'checkbox',
			Cell: ({ row }) => (
				<div className='flex justify-center items-center'>
					<Tooltip
						content='Delete Row'
						placement='left'
						offset={[0, 10]}
					>
						<div
							onClick={(e) => {
								e.stopPropagation();
								console.log(row.id); // ✅ This logs correctly?
								onDelete(row.id); // ❗This may be undefined if not scoped correctly
							}}
						>
							<TrashIcon
								className={`w-4 h-4 cursor-pointer ${
									row.id === highLightRef.current
										? 'text-white'
										: 'text-text-body group-hover:text-white'
								}`}
							/>
						</div>
					</Tooltip>
				</div>
			),
		},
	];

	return (
		<div>
			<div className='flex items-start justify-between'>
				<h2 className='font-semibold'>Create Supplier Feed</h2>
				{/* Add Button */}

				<Tooltip
					content='Add Row'
					placement='bottom'
					offset={[0, 10]}
				>
					<button
						// ref={plusButtonRef}
						onClick={onAdd}
						className='w-12 h-12 bg-primary-base hover:bg-primary-select rounded text-white flex items-center justify-center'
					>
						<PlusIcon className='w-4 h-4' />
					</button>
				</Tooltip>
			</div>
			<Table
				columns={columns}
				data={supplierFeeds}
				onRowClick={handleRowClick}
				selectedRow={selectedFeedId}
				enableRowSelection={false}
				showFilterRow={false}
			/>
		</div>
	);
}
