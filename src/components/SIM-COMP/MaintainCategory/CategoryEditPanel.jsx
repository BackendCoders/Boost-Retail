/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../services/operations/categoryApi';
import { refreshAllCategories } from '../../../slice/categorySlice';

const CategoryEditPanel = () => {
	const dispatch = useDispatch();
	const { category: selectedCategory } = useSelector((state) => state.category);
	const [name, setName] = useState('');
	const [parentId, setParentId] = useState('');

	const handleUpdate = async () => {
		try {
			const payload = {
				...selectedCategory,
				name
			};
			const res = await updateCategory(selectedCategory.id, payload);
			console.log(res);
			dispatch(refreshAllCategories());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (selectedCategory) {
			setName(selectedCategory.name || '');
			setParentId(selectedCategory.parentId || '');
		}
	}, [selectedCategory]);

	if (!selectedCategory) {
		return (
			<div className='w-[92%] bg-light p-6 text-gray-500 italic'>
				Select a category to edit its details.
			</div>
		);
	}

	return (
		<div className='w-[92%] bg-light p-6'>
			<h3 className='text-lg font-semibold mb-6 pb-2'>Edit Details</h3>

			{/* Name Field */}
			<div className='mb-5 w-56'>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Name:
				</label>
				<input
					type='text'
					placeholder='Category Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 w-full'
				/>
			</div>

			{/* Parent Category Dropdown */}
			<div className='mb-5 w-56'>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Parent category:
				</label>
				<select
					value={parentId}
					onChange={(e) => setParentId(e.target.value)}
					className='rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 border-2 focus:ring-blue-500 w-full'
				>
					<option value=''>No Parent</option>
				</select>
			</div>

			{/* Product Count & Lookup */}
			<div className='mb-5 text-sm text-gray-800'>
				<p className='font-medium'>
					Number of products: {selectedCategory.count ?? 0}
				</p>
				<p className='mt-1 text-gray-600'>Lookup tables:</p>
				<ul className='list-disc list-inside text-gray-600 mt-1'>
					{(selectedCategory.lookupTables || []).map((table, idx) => (
						<li key={idx}>{table}</li>
					))}
				</ul>
			</div>

			<button
				onClick={() => handleUpdate()}
				className='px-2 py-2 rounded-lg text-white bg-primary hover:bg-secondary'
			>
				Update
			</button>
		</div>
	);
};

export default CategoryEditPanel;
