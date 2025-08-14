/** @format */

import { useState, useMemo, useCallback, useRef } from 'react';

import PlusIcon from '../../../assets/icons/thin/PlusLargeThinIcon';
import EditIcon from '../../../assets/icons/line/EditPenIcon';
import DeleteIcon from '../../../assets/icons/thin/DeleteBinThinIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
	refreshAllCategories,
	setCategory,
} from '../../../slice/categorySlice';
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '../../../services/operations/categoryApi';
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
	const dispatch = useDispatch();
	const { categories, category: selectedCategory } = useSelector(
		(state) => state.category
	);
	const [expandedIds, setExpandedIds] = useState({});
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState('all');
	const [addingCategoryParent, setAddingCategoryParent] = useState(null);
	const [newCategoryName, setNewCategoryName] = useState('');
	const categoryRefs = useRef({});

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
		traverse(categories);
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
		traverse(categories);
		setExpandedIds(expanded);
	};

	const filterCategories = useCallback(
		(categories) => {
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
		},
		[filterType, searchTerm]
	);

	const filteredData = useMemo(
		() => filterCategories(categories),
		[filterCategories, categories]
	);

	const handleSingleClick = (cat) => {
		dispatch(setCategory(cat));
	};

	const handleDoubleClick = (cat) => {
		setEditingId(cat.id);
		setEditValue(cat.name);
	};

	const handleRenameSubmit = async (id) => {
		try {
			const category = categories.find((cat) => (cat.id === id ? cat : null));
			if (!category) return console.error('Category not found');

			// Create updated payload
			const payload = {
				...category,
				name: editValue,
			};
			const res = await updateCategory(category.id, payload);
			dispatch(refreshAllCategories());
			console.log('update Category Response', res);
		} catch (error) {
			console.log(error);
		}
		setEditingId(null);
	};

	const getParentIdForNewCategory = (clickedCategory, level) => {
		if (level === 1) {
			return 0; // root
		}
		if (level === 2) {
			// find Category 1 that contains this clicked category
			const parentCategory1 = categories.find((cat) =>
				cat.children?.some((c) => c.id === clickedCategory.id)
			);
			return parentCategory1?.id || 0;
		}
		if (level === 3) {
			// find Category 2 that contains this clicked category
			for (const cat1 of categories) {
				for (const cat2 of cat1.children || []) {
					if (cat2.children?.some((c3) => c3.id === clickedCategory.id)) {
						return cat2.id;
					}
				}
			}
		}
		return 0;
	};

	const handleAddCategoryStart = (clickedCategory, level) => {
		const pid = getParentIdForNewCategory(clickedCategory, level);
		setAddingCategoryParent({ cat: clickedCategory, level, parentId: pid });
		setNewCategoryName('');
	};
	// Handle Enter key to create category
	const handleAddCategorySubmit = async () => {
		if (!newCategoryName.trim()) return;
		const payload = {
			name: newCategoryName.trim(),
			parentId: addingCategoryParent.parentId,
		};
		// Call API here
		try {
			// Example:
			const res = await createCategory(payload);
			console.log('API Payload:', res);
			dispatch(refreshAllCategories());

			// Add to local state after API success
			// const newCat = {
			// 	id: Date.now(), // or res.data.id from API
			// 	name: newCategoryName.trim(),
			// 	count: 0,
			// 	children: [],
			// };

			// if (parentId === 0) {
			// 	dispatch(setCategories([...categories, newCat]));
			// } else {
			// 	const updated = categories.map((cat) => {
			// 		if (cat.id === parentId) {
			// 			return {
			// 				...cat,
			// 				children: [...(cat.children || []), newCat],
			// 			};
			// 		}
			// 		return cat;
			// 	});
			// 	dispatch(setCategories(updated));
			// }
		} catch (err) {
			console.error('Error creating category', err);
		}

		// Reset
		setAddingCategoryParent(null);
		setNewCategoryName('');
	};

	// Handle Delete Category
	const handleDeleteCategory = async (cat) => {
		try {
			const res = await deleteCategory(cat?.id);
			dispatch(refreshAllCategories());
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	// const handleAddCategory = (clickedCategory, level) => {
	// 	const newCat = {
	// 		id: Date.now(),
	// 		name: `New Category ${level}`,
	// 		count: 0,
	// 		children: [],
	// 	};

	// 	setNewCategoryId(newCat.id);

	// 	if (level === 1) {
	// 		// Add to root (Category 1 list)
	// 		dispatch(setCategories([...categories, newCat]));
	// 		return;
	// 	}

	// 	// Helper to immutably update
	// 	const addCategoryAtLevel = (nodes, targetParentId, targetLevel) => {
	// 		return nodes.map((node) => {
	// 			if (node.id === targetParentId && targetLevel === level) {
	// 				// Add new category at the same level
	// 				return {
	// 					...node,
	// 					children: [...(node.children || []), newCat],
	// 				};
	// 			}
	// 			if (node.children) {
	// 				return {
	// 					...node,
	// 					children: addCategoryAtLevel(
	// 						node.children,
	// 						targetParentId,
	// 						targetLevel
	// 					),
	// 				};
	// 			}
	// 			return node;
	// 		});
	// 	};

	// 	if (level === 2) {
	// 		// Find the Category 1 parent of the clicked category
	// 		const parentCategory1 = categories.find((cat) =>
	// 			cat.children?.some(
	// 				(c) =>
	// 					c.id === clickedCategory.id ||
	// 					c.children?.some((cc) => cc.id === clickedCategory.id)
	// 			)
	// 		);
	// 		if (parentCategory1) {
	// 			const updated = categories.map((cat) => {
	// 				if (cat.id === parentCategory1.id) {
	// 					return {
	// 						...cat,
	// 						children: [...cat.children, newCat],
	// 					};
	// 				}
	// 				return cat;
	// 			});
	// 			dispatch(setCategories(updated));
	// 		}
	// 	} else if (level === 3) {
	// 		// Find the Category 2 parent of the clicked category
	// 		const updated = categories.map((cat) => ({
	// 			...cat,
	// 			children: cat.children.map((cat2) => {
	// 				if (cat2.children?.some((c3) => c3.id === clickedCategory.id)) {
	// 					return {
	// 						...cat2,
	// 						children: [...cat2.children, newCat],
	// 					};
	// 				}
	// 				return cat2;
	// 			}),
	// 		}));
	// 		dispatch(setCategories(updated));
	// 	}
	// };

	// useEffect(() => {
	// 	if (newCategoryId && categoryRefs.current[newCategoryId]) {
	// 		categoryRefs.current[newCategoryId].scrollIntoView({
	// 			behavior: 'smooth',
	// 			block: 'center',
	// 		});
	// 		setNewCategoryId(null); // reset so it doesn't keep scrolling
	// 	}
	// }, [newCategoryId]);

	const renderCategory = (cat, level = 1) => {
		const isExpanded = expandedIds[cat.id] ?? true;
		const hasChildren = cat.children && cat.children.length > 0;

		return (
			<div
				key={cat.id}
				ref={(el) => (categoryRefs.current[cat.id] = el)}
				className='mb-1'
			>
				<div
					className={`flex items-center gap-2 group hover:bg-gray-50 py-1 rounded-md ${
						selectedCategory?.id === cat.id ? 'bg-blue-100' : ''
					}`}
					style={{ paddingLeft: `${level * 16}px` }}
					onClick={() => handleSingleClick(cat)}
					onDoubleClick={() => handleDoubleClick(cat)}
				>
					{/* Arrow */}
					{hasChildren && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								toggleExpand(cat.id);
							}}
							className='px-2 py-1 hover:text-primary'
						>
							<DownArrow
								className={`w-3 h-3 transform transition-transform duration-200 cursor-pointer ${
									isExpanded ? '' : '-rotate-90'
								}`}
							/>
						</button>
					)}

					{/* Name or Input */}
					{editingId === cat.id ? (
						<input
							value={editValue}
							onChange={(e) => setEditValue(e.target.value)}
							onBlur={() => handleRenameSubmit(cat.id)}
							onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(cat.id)}
							autoFocus
							className='border px-3 py-1 w-[60%] rounded text-sm'
						/>
					) : (
						<span
							className={`font-medium ${
								cat.count === 0 ? 'text-red-500' : 'text-gray-700'
							}`}
						>
							{cat.name}
						</span>
					)}

					{/* Count */}
					<span className='text-sm text-gray-400'>({cat.count})</span>

					{/* Action Icons */}
					<div className='flex items-center gap-2 ml-2'>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleAddCategoryStart(cat, level);
							}}
						>
							<PlusIcon className='w-4 h-4 cursor-pointer text-primary hover:scale-110' />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								dispatch(setCategory(cat));
							}}
						>
							<EditIcon className='w-4 h-4 cursor-pointer text-primary hover:scale-110' />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteCategory(cat);
							}}
						>
							<DeleteIcon className='w-4 h-4 cursor-pointer text-primary hover:scale-110' />
						</button>
					</div>
				</div>

				{/* Inline new category input */}
				{addingCategoryParent?.cat.id === cat.id && (
					<div
						className='flex items-center gap-2 mt-1'
						style={{ paddingLeft: `${(level + 1) * 16}px` }}
					>
						<input
							type='text'
							value={newCategoryName}
							onChange={(e) => setNewCategoryName(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleAddCategorySubmit();
								if (e.key === 'Escape') setAddingCategoryParent(null);
							}}
							autoFocus
							placeholder='Enter category name'
							className='border px-3 py-1 w-[60%] rounded text-sm'
						/>
					</div>
				)}

				{/* Children */}
				{hasChildren && isExpanded && (
					<div className='pl-8'>
						{cat.children.map((child) => renderCategory(child, level + 1))}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className='w-full sm:w-[55%] md:w-[75%] lg:w-[35%] p-5 bg-light border-r overflow-y-auto scrollbar-thin h-full'>
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
