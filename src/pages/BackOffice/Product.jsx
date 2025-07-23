/** @format */

import React, { useState } from 'react';
import AdvancedSearch from '../../components/Ui/AdvancedSearch/AdvancedSearch';
import BatchEdit from '../../components/Ui/BatchEdit/BatchEdit';
import StockLocation from '../../components/Ui/Stock/StockLocation';
import FilterBar from '../../components/Ui/Filters/FilterBar';
import ProductTable from '../../components/Ui/Table/ProductTable';
import ToggleSwitch from '../../components/Ui/Input/ToggleSwitch';

const Product = () => {
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

	return (
		<div className='p-6 space-y-6'>
			{/* Breadcrumb + Title */}
			<div>
				<p className='text-sm text-gray-500'>Catalog Setup &gt; Manage Products</p>
			    {/* Advanced Mode Toggle */}
				<div className='ml-auto flex items-center gap-2'>
					<span className='text-sm font-semibold text-gray-600'>Advanced Mode</span>
					<label className='inline-flex items-center cursor-pointer'>
						<input
							type='checkbox'
							className='sr-only'
							checked={showAdvancedSearch}
							onChange={() => setShowAdvancedSearch(!showAdvancedSearch)}
						/>
						<div className='w-11 h-6 bg-gray-300 rounded-full relative transition duration-300'>
							<div
								className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 ${
									showAdvancedSearch ? 'left-5 bg-primary-base' : 'left-0.5'
								}`}
							/>
						</div>
					</label>
				</div>
			</div>

			{/* Search Bar */}
<div className="flex flex-wrap items-center justify-between gap-4 w-full">
  {/* Left: Search Input + Reset + Toggles */}
  <div className="flex items-center gap-2 flex-grow">
    <input
      type="text"
      placeholder="Enter Part Number / MPN / Barcode / Title"
      className="flex-grow border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-base"
    />

    {/* Reset Icon */}
    <button
      title="Reset"
      className="text-gray-500 hover:text-black text-xl"
    >
      ↺
    </button>

    {/* Toggle Switches */}
    <ToggleSwitch label="EPOS" />
    <ToggleSwitch label="SIM" />
  </div>

  {/* Right: Stock Counters + Placeholder Image */}
  <div className="flex items-center gap-4">
    {[
      { label: "Our Stock", value: 56 },
      { label: "Supplier Stock", value: 5 },
      { label: "Back Order", value: 12 },
    ].map((item) => (
      <div
        key={item.label}
        className="text-center border border-primary-base px-2 py-1 rounded w-16"
      >
        <div className="font-semibold text-primary-base text-sm">{item.value}</div>
        <div className="text-[11px] text-gray-500 leading-tight">{item.label}</div>
      </div>
    ))}

    {/* Placeholder Box for image */}
    <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center">
      <span className="text-xs text-gray-400">Image</span>
    </div>
  </div>
</div>


			{/* Conditionally Render Advanced Tools */}
			{showAdvancedSearch && (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
					<div className='bg-white p-4 rounded shadow'>
						<AdvancedSearch />
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<BatchEdit />
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<StockLocation />
					</div>
				</div>
			)}

			{/* Filter Bar & Table */}
			<FilterBar />
			<ProductTable />
		</div>
	);
};

export default Product;
