/** @format */

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function AddLookupModal({ isOpen, onClose, anchorRef }) {
	const [position, setPosition] = useState({ top: 0, left: 0 });

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

				<div className='flex flex-col gap-3 text-sm'>
					<label className='font-medium'>Table Name:</label>
					<input
						type='text'
						placeholder='Enter Table Name'
						className='border rounded px-3 py-2'
					/>

					<label className='font-medium'>Supplier Feed:</label>
					<select className='border rounded px-3 py-2'>
						<option>Supplier Feed Name</option>
						<option>Giant</option>
						<option>Trek</option>
					</select>

					<label className='font-medium'>Categorisation:</label>
					<select className='border rounded px-3 py-2'>
						<option>Categories</option>
					</select>

					<label className='font-medium'>Columns:</label>
					<input
						type='text'
						placeholder='Enter Column Name'
						className='border rounded px-3 py-2'
					/>
					<input
						type='text'
						placeholder='Enter Column Name'
						className='border rounded px-3 py-2'
					/>
					<select className='border rounded px-3 py-2'>
						<option>Select Supplier Column</option>
					</select>

					<div className='flex gap-3 mt-2'>
						<button className='bg-primary text-light px-4 py-1.5 rounded hover:bg-secondary transition text-sm'>
							+ Column
						</button>
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
				</div>
			</div>
		</>,
		document.body
	);
}
