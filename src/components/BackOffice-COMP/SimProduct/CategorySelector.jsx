/** @format */

import { useState } from 'react';
import { categories, brands } from '../../../data/dummyData';

const CategorySelector = () => {
	const [selectedMain, setSelectedMain] = useState(null);
	const [selectedSub, setSelectedSub] = useState(null);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterOption, setFilterOption] = useState('all');

	// Logic
	const handleBrandToggle = (brand) => {
		setSelectedBrands((prev) =>
			prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
		);
	};

	const handleSelectAll = () => {
		const filtered = brands.filter((b) =>
			b.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setSelectedBrands(filtered);
	};

	const handleDeselectAll = () => {
		setSelectedBrands([]);
	};

	const filteredBrands = brands.filter((brand) => {
		const matchSearch = brand.toLowerCase().includes(searchTerm.toLowerCase());
		const matchFilter =
			filterOption === 'all'
				? true
				: filterOption === 'selected'
				? selectedBrands.includes(brand)
				: !selectedBrands.includes(brand);
		return matchSearch && matchFilter;
	});

	return (
		<div className='flex w-full divide-x divide-gray-300 bg-light rounded-md shadow-sm text-sm'>
			{/* Main Categories */}
			<div className='w-1/5 p-4 space-y-2'>
				<h4 className='font-semibold text-gray-800'>Main Categories</h4>
				{Object.keys(categories).map((cat) => (
					<p
						key={cat}
						onClick={() => {
							setSelectedMain(cat);
							setSelectedSub(null);
							setSelectedType(null);
						}}
						className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
							selectedMain === cat
								? 'bg-gray-100 font-semibold text-primary'
								: 'text-gray-700'
						}`}
					>
						{cat}
					</p>
				))}
			</div>

			{/* Sub Categories */}
			<div className='w-1/5 p-4 space-y-2'>
				<h4 className='font-semibold text-gray-800'>
					{selectedMain || 'Sub Categories'}
				</h4>
				{selectedMain &&
					Object.keys(categories[selectedMain]).map((sub) => (
						<p
							key={sub}
							onClick={() => {
								setSelectedSub(sub);
								setSelectedType(null);
							}}
							className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
								selectedSub === sub
									? 'bg-gray-100 font-semibold text-primary'
									: 'text-gray-700'
							}`}
						>
							{sub}
						</p>
					))}
			</div>

			{/* Types */}
			<div className='w-1/5 p-4 space-y-2'>
				<h4 className='font-semibold text-gray-800'>
					{selectedSub || 'Types'}
				</h4>
				{selectedSub &&
					categories[selectedMain][selectedSub].map((type) => (
						<p
							key={type}
							onClick={() => setSelectedType(type)}
							className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
								selectedType === type
									? 'bg-gray-100 font-semibold text-primary'
									: 'text-gray-700'
							}`}
						>
							{type}
						</p>
					))}
			</div>

			{/* Brand Filter Section */}
			<div className='w-2/5 p-4 space-y-4'>
				{selectedType ? (
					<>
						{/* Top Filter Controls */}
						<div className='flex items-center gap-4'>
							<input
								type='text'
								placeholder='Search brands'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='border border-text-body rounded px-2 py-1 text-sm w-1/2 focus:outline-none'
							/>
							<select
								value={filterOption}
								onChange={(e) => setFilterOption(e.target.value)}
								className='border border-text-body rounded px-2 py-1 text-sm'
							>
								<option value='all'>Show all</option>
								<option value='selected'>Selected</option>
								<option value='unselected'>Unselected</option>
							</select>
						</div>

						{/* Select All / Deselect All */}
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

						{/* Filtered Brand List */}
						<div className='space-y-2 max-h-[300px] overflow-auto'>
							{filteredBrands.map((brand) => (
								<label
									key={brand}
									className='block text-gray-700'
								>
									<input
										type='checkbox'
										checked={selectedBrands.includes(brand)}
										onChange={() => handleBrandToggle(brand)}
										className='mr-2'
									/>
									{brand}
								</label>
							))}
						</div>
					</>
				) : (
					<p className='text-gray-400'>Select a type to show brands</p>
				)}
			</div>
		</div>
	);
};

export default CategorySelector;
