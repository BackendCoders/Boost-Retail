/** @format */

import CategoryTree from '../../../../components/SIM-COMP/MaintainCategory/CategoryTree';
import CategoryEditPanel from '../../../../components/SIM-COMP/MaintainCategory/CategoryEditPanel';
import { useState } from 'react';

const MaintainCategory = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [categories, setCategories] = useState([]);
	return (
		<div className='bg-gray-50 min-h-screen'>
			{/* Header */}
			<div>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<h1 className='text-xl font-semibold'>CATEGORISATION</h1>
				</div>

				{/* Breadcrumb */}
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<p className='text-sm mt-1'>Maintain Categories</p>
					<span className='text-sm font-semibold'>
						Total Categories: 143
						<span className='text-red-500 ml-1'>Unused: 7</span>
					</span>
				</div>
			</div>

			{/* Main Layout */}
			<div className='flex h-[calc(100vh-108px)]'>
				<CategoryTree
					categories={categories}
					setCategories={setCategories}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				<CategoryEditPanel
					selectedCategory={selectedCategory}
					setCategories={setCategories}
				/>
			</div>
		</div>
	);
};

export default MaintainCategory;
