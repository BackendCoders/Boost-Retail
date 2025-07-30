/** @format */

import CategoryTree from '../../../../components/SIM-COMP/MaintainCategory/CategoryTree';
import CategoryEditPanel from '../../../../components/SIM-COMP/MaintainCategory/CategoryEditPanel';

const MaintainCategory = () => {
	return (
		<div className='bg-gray-50 min-h-screen'>
			{/* Header */}
			<div className='py-3 border-b bg-white px-4 flex items-center justify-between'>
				<h2 className='text-xl font-semibold'>CATEGORISATION</h2>
				<div className='text-sm text-gray-500'>
					Total Categories: <span className='font-semibold'>143</span> |
					<span className='text-red-500 ml-1'>Unused: 7</span>
				</div>
			</div>

			{/* Breadcrumb */}
			<div className='py-2 border-b bg-white px-4'>
				<p className='text-sm text-gray-600'>Maintain Categories</p>
			</div>

			{/* Main Layout */}
			<div className='flex h-[calc(100vh-108px)]'>
				<CategoryTree />
				<CategoryEditPanel />
			</div>
		</div>
	);
};

export default MaintainCategory;
