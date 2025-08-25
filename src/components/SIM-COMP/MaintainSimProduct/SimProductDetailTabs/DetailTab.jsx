/** @format */

import { useState } from 'react';
import LargeImage from '../LargeImage';
import CategorizationForm from './CategorizationForm';
import DetailForm from './DetailForm';
import TablePaginationBar from '../../../Ui/Table/TablePaginationBar';
import BottomTablePagination from '../../../Ui/Table/BottomTablePagination';
import DetailTable from './DetailTable';

export default function DetailTab() {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(50);
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex flex-wrap gap-4 px-4 min-h-[18rem]'>
				<div className='flex-1 min-w-[320px]'>
					<DetailForm />
				</div>
				<div className='flex-1 min-w-[280px]'>
					<CategorizationForm />
				</div>
				<div className='flex-1 min-w-[260px]'>
					<LargeImage />
				</div>
			</div>

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
			<DetailTable />

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
}
