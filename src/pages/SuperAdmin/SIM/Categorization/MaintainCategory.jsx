/** @format */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryTree from '../../../../components/SIM-COMP/MaintainCategory/CategoryTree';
import CategoryEditPanel from '../../../../components/SIM-COMP/MaintainCategory/CategoryEditPanel';
import { refreshAllCategories } from '../../../../slice/categorySlice';

const MaintainCategory = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.category);

	useEffect(() => {
		dispatch(refreshAllCategories());
	}, [dispatch]);

	return (
		<div className='bg-light h-full space-y-4 flex flex-col'>
			{/* Header */}
			<div>
				<div className='flex justify-between items-center py-3 border-b border-b-gray-60'>
					<h1 className='text-xl font-semibold'>CATEGORIZATION</h1>
				</div>

				{/* Breadcrumb */}
				<div className='flex justify-between items-center py-3 border-b border-b-gray-60'>
					<p className='text-sm mt-1'>Maintain Categories</p>
					<span className='text-sm font-semibold'>
						Total Categories: {categories.length}
						<span className='text-red-500 ml-1'>Unused: 7</span>
					</span>
				</div>
			</div>

			{/* Main Layout */}
			<div className='flex flex-1 overflow-hidden flex-col md:flex-row'>
				<CategoryTree />

				<CategoryEditPanel />
			</div>
		</div>
	);
};

export default MaintainCategory;
