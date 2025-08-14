/** @format */
import { useEffect, useState } from 'react';

import CategoryTree from '../../../../components/SIM-COMP/MaintainCategory/CategoryTree';
import CategoryEditPanel from '../../../../components/SIM-COMP/MaintainCategory/CategoryEditPanel';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAllCategories } from '../../../../slice/categorySlice';

const MaintainCategory = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.category);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		dispatch(refreshAllCategories());
	}, [dispatch]);

	return (
		<div className='bg-light space-y-4'>
			{/* Header */}
			<div>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<h1 className='text-xl font-semibold'>CATEGORISATION</h1>
				</div>

				{/* Breadcrumb */}
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<p className='text-sm mt-1'>Maintain Categories</p>
					<span className='text-sm font-semibold'>
						Total Categories: {categories.length}
						<span className='text-red-500 ml-1'>Unused: 7</span>
					</span>
				</div>
			</div>

			{/* Main Layout */}
			<div className='flex'>
				<CategoryTree
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				<CategoryEditPanel selectedCategory={selectedCategory} />
			</div>
		</div>
	);
};

export default MaintainCategory;
