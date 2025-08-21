/** @format */

import { useState } from 'react';
import AdvancedSearch from '../../../components/Ui/AdvancedSearch/AdvancedSearch';
import BatchEdit from '../../../components/Ui/BatchEdit/BatchEdit';
import StockLocation from '../../../components/Ui/Stock/StockLocation';
import MainTable from '../../../components/Ui/Table/MainTable';
import TablePaginationBar from '../../../components/Ui/Table/TablePaginationBar';
import BottomTablePagination from '../../../components/Ui/Table/BottomTablePagination';
import ProductSearchBar from '../../../components/Ui/search/ProductSearchBar';

const Product = () => {
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(50);

	const [data, setData] = useState([
		{
			id: 1,
			partNumber: '0000001',
			mpn: '09485403985',
			title: 'TCR 7.2 ACR',
			make: 'Giant',
			size: 'XL',
			colour: 'Black',
			year: 2025,
			price: '£3,999',
			promo: '£2,999',
			stock: 11,
			current: true,
			web: true,
		},
		{
			id: 2,
			partNumber: '0000002',
			mpn: '09485403986',
			title: 'TCR 7.2 ACR',
			make: 'Giant',
			size: 'L',
			colour: 'Black',
			year: 2025,
			price: '£3,999',
			promo: '£2,999',
			stock: 5,
			current: false,
			web: true,
		},
		{
			id: 3,
			partNumber: '0000003',
			mpn: '09485403987',
			title: 'TCR 7.2 ACR',
			make: 'Giant',
			size: 'M',
			colour: 'Black',
			year: 2025,
			price: '£3,999',
			promo: '£2,999',
			stock: 9,
			current: true,
			web: false,
		},
	]);

	const [selectedRows, setSelectedRows] = useState([]);

	const columns = [
		{ key: 'partNumber', label: 'Part Number', type: 'text' },
		{ key: 'mpn', label: 'MPN', type: 'text' },
		{ key: 'title', label: 'Title', type: 'text' },
		{ key: 'make', label: 'Make', type: 'text' },
		{ key: 'size', label: 'Size', type: 'text' },
		{ key: 'colour', label: 'Colour', type: 'text' },
		{ key: 'year', label: 'Year', type: 'number' },
		{ key: 'price', label: 'Price', type: 'number' },
		{ key: 'promo', label: 'Promo', type: 'number' },
		{ key: 'stock', label: 'Stock', type: 'number' },
		{ key: 'current', label: 'Current', type: 'checkbox' },
		{ key: 'web', label: 'Web', type: 'checkbox' },
	];

	// Column visibility state
	const allLabels = columns.map((col) => col.label);
	const [selectedColumns, setSelectedColumns] = useState(allLabels);
	const displayCols = columns.filter((col) =>
		selectedColumns.includes(col.label)
	);

	const handleRowSelect = (id, isSelected) => {
		if (id === 'all') {
			const allIds = isSelected ? data.map((r) => r.id) : [];
			setSelectedRows(allIds);
		} else {
			setSelectedRows((prev) =>
				isSelected ? [...prev, id] : prev.filter((i) => i !== id)
			);
		}
	};

	const handleCheckboxToggle = (id, key, checked) => {
		setData((prev) =>
			prev.map((r) => (r.id === id ? { ...r, [key]: checked } : r))
		);
	};

	return (
		<div className='py-1 space-y-2'>
			{/* Header */}
			<div className='py-3 border-b bg-light px-4 flex items-center justify-between'>
				<h2 className='text-section-heading font-bold'>PRODUCTS</h2>
				<div className='flex items-center gap-2'>
					<span>Advanced Mode</span>
					<label className='relative inline-flex items-center cursor-pointer'>
						<input
							type='checkbox'
							className='sr-only'
							checked={showAdvancedSearch}
							onChange={() => setShowAdvancedSearch((p) => !p)}
						/>
						<div
							className={`w-11 h-6 rounded-full transition ${
								showAdvancedSearch ? 'bg-primary' : 'bg-gray-400'
							}`}
						>
							<div
								className={`absolute top-0.5 w-5 h-5 bg-light rounded-full transition ${
									showAdvancedSearch ? 'left-5' : 'left-0.5'
								}`}
							/>
						</div>
					</label>
				</div>
			</div>

			{/* Breadcrumb */}
			<div className='py-2 border-b bg-light px-4'>
				<p className='text-breadcrumb'>Catalog Setup &gt; Manage Products</p>
			</div>

			{/* Search */}
			<div className='px-4'>
				<ProductSearchBar
					ourStock={56}
					supplierStock={5}
					backOrder={12}
				/>
			</div>

			{/* Advanced Tools */}
			{showAdvancedSearch && (
				<div className='flex flex-wrap gap-4 px-4'>
					<div className='flex-1 min-w-[320px]'>
						<AdvancedSearch />
					</div>
					<div className='flex-1 min-w-[280px]'>
						<BatchEdit />
					</div>
					<div className='flex-1 min-w-[260px]'>
						<StockLocation />
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
				availableColumns={allLabels}
				selectedColumns={selectedColumns}
				onColumnsChange={setSelectedColumns}
			/>

			{/* Data Table */}
			<MainTable
				columns={displayCols}
				data={data}
				selectedRows={selectedRows}
				onRowSelect={handleRowSelect}
				onCheckboxToggle={handleCheckboxToggle}
			/>

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

export default Product;
