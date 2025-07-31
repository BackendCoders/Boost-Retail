/** @format */

import { useState } from 'react';
import { categories, brands } from '../../../data/dummyData';

const BrandSelector = () => {
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterOption, setFilterOption] = useState('all');
	const [brandSearch, setBrandSearch] = useState('');

	const allCategories = categories?.Accessories?.Bags || [];

	const handleToggleCategory = (category) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const handleSelectAll = () => {
		const filtered = allCategories.filter((cat) =>
			cat.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setSelectedCategories(filtered);
	};

	const handleDeselectAll = () => {
		setSelectedCategories([]);
	};

	const filteredCategories = allCategories.filter((cat) => {
		const matchSearch = cat.toLowerCase().includes(searchTerm.toLowerCase());
		const matchFilter =
			filterOption === 'all'
				? true
				: filterOption === 'selected'
				? selectedCategories.includes(cat)
				: !selectedCategories.includes(cat);
		return matchSearch && matchFilter;
	});

	const filteredBrands = brands.filter((b) =>
		b.toLowerCase().includes(brandSearch.toLowerCase())
	);

	return (
		<div className='flex w-full divide-x divide-gray-300 bg-offWhite rounded-md shadow-sm text-sm'>
			{/* Left: Brand List */}
			<div className='w-1/5 p-4 space-y-2'>
				<h4 className='font-semibold text-gray-800'>Brands</h4>
				<input
					type='text'
					placeholder='Search brands'
					value={brandSearch}
					onChange={(e) => setBrandSearch(e.target.value)}
					className='border border-text-body rounded px-2 py-1 text-sm w-full focus:outline-none'
				/>
				<div className='space-y-1 max-h-[300px] overflow-auto'>
					{filteredBrands.map((brand) => (
						<p
							key={brand}
							onClick={() => {
								setSelectedBrand(brand);
								setSelectedCategories([]); // Reset on change
							}}
							className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
								selectedBrand === brand
									? 'bg-gray-100 font-semibold text-primary-base'
									: 'text-gray-700'
							}`}
						>
							{brand}
						</p>
					))}
				</div>
			</div>

			{/* Right: Categories per selected brand */}
			{selectedBrand && (
				<div className='w-4/5 p-4 space-y-4'>
					{/* Brand Heading */}
					<div className='flex items-center justify-between'>
						<h4 className='text-md font-bold text-black'>{selectedBrand}</h4>
					</div>

					{/* Filters */}
					<div className='flex items-center gap-4'>
						<input
							type='text'
							placeholder='Search categories'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='border border-text-body rounded px-2 py-1 text-sm w-1/2 focus:outline-none'
						/>
						<select
							value={filterOption}
							onChange={(e) => setFilterOption(e.target.value)}
							className='border border-gray-300 rounded px-2 py-1 text-sm'
						>
							<option value='all'>Show all</option>
							<option value='selected'>Selected</option>
							<option value='unselected'>Unselected</option>
						</select>
					</div>

					{/* Select / Deselect All */}
					<div className='flex items-center gap-2 text-xs text-blue-600 cursor-pointer'>
						<span
							onClick={handleSelectAll}
							className='hover:underline'
						>
							Select All
						</span>
						<span>|</span>
						<span
							onClick={handleDeselectAll}
							className='hover:underline'
						>
							Deselect All
						</span>
					</div>

					{/* Category List */}
					<div className='space-y-2 max-h-[300px] overflow-auto'>
						{filteredCategories.map((cat) => (
							<label
								key={cat}
								className='block text-gray-700'
							>
								<input
									type='checkbox'
									checked={selectedCategories.includes(cat)}
									onChange={() => handleToggleCategory(cat)}
									className='mr-2'
								/>
								Accessories &gt; Bags &gt; {cat}
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default BrandSelector;
