/** @format */

import { useState, useMemo } from 'react';
import categoryData from '../../../data/dummyCategories.json';

import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import EditIcon from '../../../assets/icons/line/EditPenIcon';
import DeleteIcon from '../../../assets/icons/thin/DeleteBinThinIcon';
// import DownArrow from '../../../assets/icons/thin/DownThinIcon';

// ✅ Replace with inline SVG if your icon component doesn't rotate properly
const DownArrow = ({ className = '', ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 20 20'
		fill='currentColor'
		className={className}
		{...props}
	>
		<path
			fillRule='evenodd'
			d='M5.23 7.21a.75.75 0 011.06.02L10 11.586l3.71-4.356a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z'
			clipRule='evenodd'
		/>
	</svg>
);

const CategoryTree = () => {
	const [expandedIds, setExpandedIds] = useState({});
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState('all');

	const toggleExpand = (id) => {
		setExpandedIds((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const collapseAll = () => {
		const collapsed = {};
		const traverse = (items) => {
			items.forEach((cat) => {
				collapsed[cat.id] = false;
				if (cat.children) traverse(cat.children);
			});
		};
		traverse(categoryData);
		setExpandedIds(collapsed);
	};

	const expandAll = () => {
		const expanded = {};
		const traverse = (items) => {
			items.forEach((cat) => {
				expanded[cat.id] = true;
				if (cat.children) traverse(cat.children);
			});
		};
		traverse(categoryData);
		setExpandedIds(expanded);
	};

	const filterCategories = (categories) => {
		return categories
			.map((cat) => {
				const children = cat.children ? filterCategories(cat.children) : [];

				const matchesSearch = cat.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase());

				const matchesFilter =
					filterType === 'all'
						? true
						: filterType === 'hasProducts'
						? cat.count > 0
						: cat.count === 0;

				const shouldInclude =
					(matchesSearch && matchesFilter) || children.length > 0;

				if (!shouldInclude) return null;

				return {
					...cat,
					children,
				};
			})
			.filter(Boolean);
	};

	const filteredData = useMemo(
		() => filterCategories(categoryData),
		[searchTerm, filterType]
	);

	const renderCategory = (cat, level = 1) => {
		const isExpanded = expandedIds[cat.id] ?? true;
		const hasChildren = cat.children && cat.children.length > 0;

		return (
			<div
				key={cat.id}
				className='mb-1'
			>
				<div
					className='flex items-center gap-2 group hover:bg-gray-50 py-1 rounded-md'
					style={{ paddingLeft: `${level * 16}px` }}
				>
					{/* Arrow */}
					{hasChildren && (
						<DownArrow
							className={`w-3 h-3 transform transition-transform duration-200 cursor-pointer ${
								isExpanded ? '' : '-rotate-90'
							}`}
							onClick={() => toggleExpand(cat.id)}
						/>
					)}

					{/* Text */}
					<span
						className={`font-medium ${
							cat.count === 0 ? 'text-red-500' : 'text-gray-700'
						}`}
					>
						{cat.name}
					</span>

					{/* Count */}
					<span className='text-sm text-gray-400'>({cat.count})</span>

					{/* Action Icons */}
					<div className='flex items-center gap-2 ml-2'>
						<PlusIcon className='w-4 h-4 cursor-pointer text-primary-base hover:scale-110' />
						<EditIcon className='w-4 h-4 cursor-pointer text-primary-base hover:scale-110' />
						<DeleteIcon className='w-4 h-4 cursor-pointer text-primary-base hover:scale-110' />
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
		<div className='w-[35%] p-5 bg-offWhite border-r overflow-y-auto'>
			{/* Search and Filter */}
			<div className='flex gap-4 mb-3'>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search categories'
					className='border px-3 py-1 w-[60%] rounded text-sm'
				/>
				<select
					value={filterType}
					onChange={(e) => setFilterType(e.target.value)}
					className='border px-2 py-1 rounded text-sm w-[25%]'
				>
					<option value='all'>Show all</option>
					<option value='hasProducts'>Show has products</option>
					<option value='noProducts'>Show has no products</option>
				</select>
			</div>

			{/* Collapse/Expand Controls */}
			<div className='text-xs text-gray-500 mb-3'>
				<span
					className='cursor-pointer hover:underline'
					onClick={collapseAll}
				>
					Collapse All
				</span>{' '}
				|{' '}
				<span
					className='cursor-pointer hover:underline'
					onClick={expandAll}
				>
					Expand All
				</span>
			</div>

			{/* Tree */}
			<div className='text-sm'>
				{filteredData.map((cat) => renderCategory(cat))}
			</div>
		</div>
	);
};

export default CategoryTree;
