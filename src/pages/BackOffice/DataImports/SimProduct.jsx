/** @format */

import { useState } from 'react';
import BrandSelector from '../../../components/BackOffice-COMP/SimProduct/BrandSelector';
import CategorySelector from '../../../components/BackOffice-COMP/SimProduct/CategorySelector';

const SimProduct = () => {
	const [managedByBrand, setManagedByBrand] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedBrands, setSelectedBrands] = useState([]);

	return (
		<div className='py-1 space-y-1'>
			{/* Header */}
			<div className='py-3 border-b bg-light px-4 flex items-center justify-between'>
				<h2 className='text-section-heading font-bold'>PRODUCTS</h2>
				<div className='flex items-center gap-2'>
					<span>Manage by Brand</span>
					<label className='relative inline-flex items-center cursor-pointer'>
						<input
							type='checkbox'
							className='sr-only'
							checked={managedByBrand}
							onChange={() => setManagedByBrand((p) => !p)}
						/>
						<div
							className={`w-11 h-6 rounded-full transition ${
								managedByBrand ? 'bg-primary' : 'bg-gray-400'
							}`}
						>
							<div
								className={`absolute top-0.5 w-5 h-5 bg-light rounded-full transition ${
									managedByBrand ? 'left-5' : 'left-0.5'
								}`}
							/>
						</div>
					</label>
				</div>
			</div>

			{/* Breadcrumb */}
			<div className='flex items-center justify-between py-2 border-b bg-light px-4'>
				<p className='text-breadcrumb'>Data Imports &gt; SIM Products</p>

				{/* Selected Info */}
				<div className='px-4 py-2 bg-light text-sm'>
					<span className='font-semibold'>Selected:</span>{' '}
					<span>
						{managedByBrand
							? `${selectedBrands.length} Brands`
							: `${selectedCategories.length} Categories`}
					</span>
				</div>
			</div>

			{/* Content Area */}
			<div className='bg-light min-h-[calc(100vh-150px)] px-4'>
				{managedByBrand ? (
					<BrandSelector
						selectedBrands={selectedBrands}
						setSelectedBrands={setSelectedBrands}
					/>
				) : (
					<CategorySelector
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
					/>
				)}
			</div>
		</div>
	);
};

export default SimProduct;
