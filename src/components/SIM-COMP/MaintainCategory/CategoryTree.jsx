/** @format */

import { useState } from 'react';
import categoryData from '../../../data/dummyCategories.json';

import plusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import editIcon from '../../../assets/icons/thin/DeleteBinThinIcon';
import deleteIcon from '../../../assets/icons/thin/DeleteBinThinIcon';
import downArrow from '../../../assets/icons/thin/DownThinIcon';

const CategoryTree = () => {
	const [expandedIds, setExpandedIds] = useState({});

	const toggleExpand = (id) => {
		setExpandedIds((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const renderCategory = (cat, level = 1) => {
		const isExpanded = expandedIds[cat.id] ?? true;
		const hasChildren = cat.children && cat.children.length > 0;

		return (
			<div
				key={cat.id}
				className='mb-1'
			>
				<div
					className={`flex items-center gap-2 group hover:bg-gray-50 py-1 rounded-md`}
					style={{ paddingLeft: `${level * 16}px` }}
				>
					{/* Toggle Arrow */}
					{hasChildren && (
						<img
							src={downArrow}
							alt='toggle'
							className={`w-3 h-3 transform transition-transform duration-200 cursor-pointer ${
								isExpanded ? '' : '-rotate-90'
							}`}
							onClick={() => toggleExpand(cat.id)}
						/>
					)}

					{/* Category Text */}
					<span
						className={`font-medium ${
							cat.count === 0 ? 'text-red-500' : 'text-gray-700'
						}`}
					>
						{cat.name}
					</span>

					{/* Count */}
					<span className='text-sm text-gray-400'>({cat.count})</span>

					{/* Icons: Now inline */}
					<div className='flex items-center gap-2 ml-2'>
						<img
							src={plusIcon}
							alt='Add'
							className='w-4 h-4 cursor-pointer hover:scale-110'
						/>
						<img
							src={editIcon}
							alt='Edit'
							className='w-4 h-4 cursor-pointer hover:scale-110'
						/>
						<img
							src={deleteIcon}
							alt='Delete'
							className='w-4 h-4 cursor-pointer hover:scale-110'
						/>
					</div>
				</div>

				{/* Children */}
				{hasChildren && isExpanded && (
					<div>
						{cat.children.map((child) => renderCategory(child, level + 1))}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className='w-[35%] p-5 bg-white border-r overflow-y-auto'>
			{/* Search and Filter */}
			<div className='flex gap-4 mb-3'>
				<input
					type='text'
					placeholder='Search categories'
					className='border px-3 py-1 w-[60%] rounded text-sm'
				/>
				<select className='border px-2 py-1 rounded text-sm w-[25%]'>
					<option>Show all</option>
					<option>Show has products</option>
					<option>Show has no products</option>
				</select>
			</div>

			{/* Collapse/Expand Controls */}
			<div className='text-xs text-gray-500 mb-3'>
				<span className='cursor-pointer hover:underline'>Collapse All</span> |{' '}
				<span className='cursor-pointer hover:underline'>Expand All</span>
			</div>

			{/* Category Tree List */}
			<div className='text-sm'>
				{categoryData.map((cat) => renderCategory(cat))}
			</div>
		</div>
	);
};

export default CategoryTree;
