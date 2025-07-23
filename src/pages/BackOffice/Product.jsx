import React, { useState } from 'react';
import AdvancedSearch from '../../components/Ui/AdvancedSearch/AdvancedSearch';
import BatchEdit from '../../components/Ui/BatchEdit/BatchEdit';
import StockLocation from '../../components/Ui/Stock/StockLocation';
import FilterBar from '../../components/Ui/Filters/FilterBar';
import ProductTable from '../../components/Ui/Table/ProductTable';
import IconButton from '../../components/Ui/Button/IconButton';
import ToggleSwitch from '../../components/Ui/Input/ToggleSwitch';

const Product = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  return (
    <div className="p-4 space-y-6">
      {/* Breadcrumb + Title */}
      <div>
        <p className="text-sm text-gray-500">Catalog Setup &gt; Manage Products</p>
        <h1 className="text-2xl font-bold">PRODUCTS</h1>
      </div>

      {/* Search Bar + Advanced Toggle */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Enter Part Number / MPN / Barcode / Title"
          className="flex-grow border rounded px-3 py-2"
        />
        <IconButton icon="🔍" />
        <div className="flex items-center gap-3">
          <ToggleSwitch label="EPOS" />
          <ToggleSwitch label="SIM" />
        </div>

        {/* Advanced Mode Toggle */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Advanced Mode</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={showAdvancedSearch}
              onChange={() => setShowAdvancedSearch(!showAdvancedSearch)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full relative transition duration-300">
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 ${
                  showAdvancedSearch ? 'left-5' : 'left-0.5'
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Conditional Advanced Search Box */}
      {showAdvancedSearch && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 lg:col-span-1 bg-white p-4 rounded shadow">
            <AdvancedSearch />
          </div>
          <div className="col-span-1 lg:col-span-1 bg-white p-4 rounded shadow">
            <BatchEdit />
          </div>
          <div className="col-span-1 lg:col-span-1 bg-white p-4 rounded shadow">
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
