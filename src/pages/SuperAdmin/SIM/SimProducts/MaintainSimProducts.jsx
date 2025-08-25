/** @format */

import { useState } from 'react';
import SimProductSearch from '../../../../components/SIM-COMP/MaintainSimProduct/SimProductSearch';
import AdvancedSearch from '../../../../components/Ui/AdvancedSearch/AdvancedSearch';
import Description from '../../../../components/SIM-COMP/MaintainSimProduct/Description';
import LargeImage from '../../../../components/SIM-COMP/MaintainSimProduct/LargeImage';
import TablePaginationBar from '../../../../components/Ui/Table/TablePaginationBar';
import SimProductsTable from '../../../../components/SIM-COMP/MaintainSimProduct/SimProductsTable';
import BottomTablePagination from '../../../../components/Ui/Table/BottomTablePagination';

const MaintainSimProducts = () => {
	const [advancedMode, setAdvancedMode] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(50);

	return (
		<div className='space-y-4'>
			{/* Header Section */}
			<div className=''>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<h1 className='text-xl font-bold'>SIM PRODUCTS</h1>
					<div className='flex items-center gap-2'>
						<span>Advanced Mode</span>
						<label className='relative inline-flex items-center cursor-pointer'>
							<input
								type='checkbox'
								className='sr-only'
								checked={advancedMode}
								onChange={() => setAdvancedMode((p) => !p)}
							/>
							<div
								className={`w-11 h-6 rounded-full transition ${
									advancedMode ? 'bg-primary' : 'bg-gray-400'
								}`}
							>
								<div
									className={`absolute top-0.5 w-5 h-5 bg-light rounded-full transition ${
										advancedMode ? 'left-5' : 'left-0.5'
									}`}
								/>
							</div>
						</label>
					</div>
				</div>
				<div className='flex justify-between items-center py-3 border-b border-b-border-grid'>
					<p className='text-sm mt-1'>Maintain Sim Products</p>
					<div className='flex items-center gap-4 text-sm font-semibold'>
						<span className=''>
							Total Products: 500,000
							{/* {fakeCategories.length} */}
						</span>
						<span className='text-red-400'>Uncategorised: 20,000</span>
					</div>
				</div>
			</div>

			{/* Search */}
			<SimProductSearch />

			{/* Advance Search Area */}
			{advancedMode && (
				<div className='flex flex-wrap gap-4 max-h-[28rem]'>
					<div className='flex-1 min-w-[320px] h-full'>
						<AdvancedSearch />
					</div>
					<div className='flex-1 min-w-[280px] h-full'>
						<Description />
					</div>
					<div className='flex-1 min-w-[260px] h-full'>
						<LargeImage />
					</div>
				</div>
			)}

			{/* Pagination & Column Settings */}
			<TablePaginationBar
				currentPage={currentPage}
				totalPages={100}
				productsPerPage={perPage}
				onPageChange={(dir) =>
					setCurrentPage((p) =>
						dir === 'prev' ? Math.max(p - 1, 1) : Math.min(p + 1, 100)
					)
				}
				onPerPageChange={setPerPage}
				// availableColumns={allLabels}
				// selectedColumns={selectedColumns}
				// onColumnsChange={setSelectedColumns}
			/>

			{/* Table Area */}
			<SimProductsTable />

			{/* Bottom Pagination */}
			<BottomTablePagination
				currentPage={currentPage}
				totalPages={100}
				onPageChange={(dir) =>
					setCurrentPage((p) =>
						dir === 'prev' ? Math.max(p - 1, 1) : Math.min(p + 1, 100)
					)
				}
			/>
		</div>
	);
};

export default MaintainSimProducts;
