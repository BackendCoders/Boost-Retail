/** @format */

import React, { useState } from 'react';
import AdvancedSearch from '../../components/Ui/AdvancedSearch/AdvancedSearch';
import BatchEdit from '../../components/Ui/BatchEdit/BatchEdit';
import StockLocation from '../../components/Ui/Stock/StockLocation';
import FilterBar from '../../components/Ui/Filters/FilterBar';
import MainTable from '../../components/Ui/Table/MainTable';
import TablePaginationBar from '../../components/Ui/Table/TablePaginationBar';
import ToggleSwitch from '../../components/Ui/Input/ToggleSwitch';

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
    { key: 'partNumber', label: 'Part Number' },
    { key: 'mpn', label: 'MPN' },
    { key: 'title', label: 'Title' },
    { key: 'make', label: 'Make' },
    { key: 'size', label: 'Size' },
    { key: 'colour', label: 'Colour' },
    { key: 'year', label: 'Year' },
    { key: 'price', label: 'Price' },
    { key: 'promo', label: 'Promo' },
    { key: 'stock', label: 'Stock' },
    { key: 'current', label: 'Current', type: 'checkbox' },
    { key: 'web', label: 'Web', type: 'checkbox' },
  ];

  const handleRowSelect = (id, isSelected) => {
    const updatedSelection = isSelected
      ? [...selectedRows, id]
      : selectedRows.filter(rowId => rowId !== id);
    setSelectedRows(updatedSelection);
  };

  const handleCheckboxToggle = (id, key, checked) => {
    const updated = data.map(row =>
      row.id === id ? { ...row, [key]: checked } : row
    );
    setData(updated);
  };

  const handleFilterChange = (key, value) => {
    if (key === 'clear') {
      // Clear filters logic here
    } else {
      // Handle filtering logic here
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb + Title */}
      <div>
        <p className="text-sm text-gray-500">Catalog Setup &gt; Manage Products</p>

        {/* Advanced Mode Toggle */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600">Advanced Mode</span>
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
                  showAdvancedSearch ? 'left-5 bg-primary-base' : 'left-0.5'
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-2 flex-grow">
          <input
            type="text"
            placeholder="Enter Part Number / MPN / Barcode / Title"
            className="flex-grow border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-base"
          />
          <button title="Reset" className="text-gray-500 hover:text-black text-xl">
            ↺
          </button>
          <ToggleSwitch label="EPOS" />
          <ToggleSwitch label="SIM" />
        </div>

        <div className="flex items-center gap-4">
          {[
            { label: 'Our Stock', value: 56 },
            { label: 'Supplier Stock', value: 5 },
            { label: 'Back Order', value: 12 },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center border border-primary-base px-2 py-1 rounded w-16"
            >
              <div className="font-semibold text-primary-base text-sm">{item.value}</div>
              <div className="text-[11px] text-gray-500 leading-tight">{item.label}</div>
            </div>
          ))}
          <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center">
            <span className="text-xs text-gray-400">Image</span>
          </div>
        </div>
      </div>

      {showAdvancedSearch && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <AdvancedSearch />
          </div>
          <div >
            <BatchEdit />
          </div>
          <div>
            <StockLocation />
          </div>
        </div>
      )}

      <TablePaginationBar
        currentPage={currentPage}
        totalPages={100}
        productsPerPage={perPage}
        onPageChange={(direction) =>
          setCurrentPage(prev =>
            direction === 'prev' ? Math.max(prev - 1, 1) : Math.min(prev + 1, 100)
          )
        }
        onPerPageChange={(count) => setPerPage(count)}
      />

      <MainTable
        columns={columns}
        data={data}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onCheckboxToggle={handleCheckboxToggle}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default Product;