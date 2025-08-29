/** @format */

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SelectInput from '../../Ui/Input/SelectInput';
import { Controller, useForm } from 'react-hook-form';
import { getSupplierColumns } from '../../../services/operations/categoryApi';
import CloseSmallestStandardIcon from '../../../assets/icons/standard/CloseSmallestStandardIcon';

const supplierFeedsOptions = [
	{ value: 0, label: 'Cannondale' },
	{ value: 1, label: 'Cube' },
	{ value: 2, label: 'Frog' },
	{ value: 3, label: 'Giant' },
	{ value: 4, label: 'Haibike' },
	{ value: 5, label: 'Lapierre' },
	{ value: 6, label: 'Liv' },
	{ value: 7, label: 'Marin' },
	{ value: 8, label: 'Merida' },
	{ value: 9, label: 'Orbea' },
	{ value: 10, label: 'Raleigh' },
	{ value: 11, label: 'Specialized' },
	{ value: 12, label: 'Tern' },
	{ value: 13, label: 'Trek' },
	{ value: 14, label: 'Whyte' },
];

export default function AddLookupModal({ isOpen, onClose, anchorRef }) {
	const { handleSubmit, control, watch } = useForm({
		defaultValues: {
			supplierFeed: null,
			categorisation: null,
			tableName: '',
		},
	});
	const [supplierColumnsOptions, setSupplierColumnsOptions] = useState([
		{ value: '', label: '' },
	]);
	const [selectedColumnList, setSelectedColumnList] = useState([]);
	const [position, setPosition] = useState({ top: 0, left: 0 });

	const selectedSupplierFeed = watch('supplierFeed');
	const selectedSupplierColumns = watch('supplierColumns');

	useEffect(() => {
		if (selectedSupplierColumns) {
			setSelectedColumnList((prev) => [...prev, selectedSupplierColumns]);
		} else {
			setSelectedColumnList([]);
		}
	}, [selectedSupplierColumns]);

	console.log('Selected Columns List:', selectedColumnList);

	useEffect(() => {
		async function supplierColumns() {
			if (selectedSupplierFeed) {
				try {
					const response = await getSupplierColumns(selectedSupplierFeed);
					console.log('Fetch columns for supplier feed ID:', response);

					// Assuming response is an array of column names/objects
					const options = response.map((col) => ({
						value: col.id || col, // or whatever unique field comes from API
						label: col.label || col, // display text
					}));

					setSupplierColumnsOptions(options);
				} catch (error) {
					console.error('Error fetching supplier columns:', error);
				}
			} else {
				setSupplierColumnsOptions([]); // clear when nothing is selected
			}
		}

		supplierColumns();
	}, [selectedSupplierFeed]);

	useEffect(() => {
		if (isOpen && anchorRef?.current) {
			const rect = anchorRef.current.getBoundingClientRect();
			const modalWidth = 370; // Tailwind's w-96
			const padding = -15;

			let top = rect.bottom + window.scrollY + padding;
			let left = rect.left + window.scrollX;

			if (left + modalWidth > window.innerWidth) {
				left = window.innerWidth - modalWidth - padding;
			}

			setPosition({ top, left });
		}
	}, [isOpen, anchorRef]);

	const onSubmit = (data) => {
		console.log(data);
	};

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<>
			{/* Overlay background */}
			<div
				className='fixed inset-0 bg-black bg-opacity-30 z-40'
				onClick={onClose}
			/>

			{/* Floating Modal */}
			<div
				className='fixed z-50 w-80 bg-light border border-gray-300 rounded-xl shadow-2xl p-5'
				style={{
					top: `${position.top}px`,
					left: `${position.left}px`,
				}}
			>
				<h2 className='text-lg font-semibold mb-4'>New Lookup Table</h2>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-3 text-sm'
				>
					<label className='font-medium'>Table Name:</label>
					<input
						type='text'
						placeholder='Enter Table Name'
						className='border rounded px-3 py-2'
					/>

					<label className='font-medium'>Supplier Feed:</label>
					<Controller
						name='supplierFeed'
						control={control}
						render={({ field }) => (
							<SelectInput
								options={supplierFeedsOptions}
								placeholder='Choose Supplier Feed...'
								value={
									supplierFeedsOptions.find(
										(option) => option.value === field.value
									) || null
								}
								onChange={(selected) =>
									field.onChange(selected ? selected.value : null)
								}
							/>
						)}
					/>

					<label className='font-medium'>Categorisation:</label>
					<SelectInput
						placeholder='Select Categories...'
						options={[
							{ value: 'Categories', label: 'Categories' },
							{ value: 'Search 1/2', label: 'Search 1/2' },
						]}
					/>

					<label className='font-medium'>Columns:</label>
					{/* <input
						type='text'
						placeholder='Enter Column Name'
						className='border rounded px-3 py-2'
					/>
					<input
						type='text'
						placeholder='Enter Column Name'
						className='border rounded px-3 py-2'
					/> */}
					{selectedColumnList.length > 0 && (
						<div className='flex flex-wrap gap-2 mb-2'>
							{selectedColumnList.map((col, index) => (
								<button
									key={index}
									className='bg-white border px-2 py-1 rounded flex items-center'
								>
									<span>{col}</span>{' '}
									<span
										className='ml-1 cursor-pointer'
										onClick={() =>
											setSelectedColumnList((prev) =>
												prev.filter((_, i) => i !== index)
											)
										}
									>
										<CloseSmallestStandardIcon className='text-gray-500 font-bold hover:text-gray-700 hover:font-bold bg-gray-200 rounded-sm' />
									</span>
								</button>
							))}
						</div>
					)}

					<Controller
						name='supplierColumns'
						control={control}
						render={({ field }) => (
							<SelectInput
								options={supplierColumnsOptions}
								placeholder='Select Supplier Column...'
								value={
									supplierFeedsOptions.find(
										(option) => option.value === field.value
									) || null
								}
								onChange={(selected) =>
									field.onChange(selected ? selected.value : null)
								}
							/>
						)}
					/>

					<div className='flex gap-3 mt-2'>
						{/* <button className='bg-primary text-light px-4 py-1.5 rounded hover:bg-secondary transition text-sm'>
							+ Column
						</button> */}
						<button className='border border-primary text-primary px-4 py-1.5 rounded hover:bg-blue-50 transition text-sm'>
							+ Supplier Column
						</button>
					</div>

					{/* Footer Buttons */}
					<div className='flex justify-end gap-3 mt-5'>
						<button
							onClick={onClose}
							className='text-gray-700 px-4 py-1.5 border rounded hover:bg-gray-100 transition text-sm'
						>
							CANCEL
						</button>
						<button className='bg-primary text-light px-4 py-1.5 rounded hover:bg-secondary transition text-sm'>
							CREATE
						</button>
					</div>
				</form>
			</div>
		</>,
		document.body
	);
}
