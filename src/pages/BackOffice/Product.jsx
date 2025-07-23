/** @format */

import React, { useState } from 'react';
import AdvancedSearch from '../../components/Ui/AdvancedSearch/AdvancedSearch';
import BatchEdit from '../../components/Ui/BatchEdit/BatchEdit';
import StockLocation from '../../components/Ui/Stock/StockLocation';
import MainTable from '../../components/Ui/Table/MainTable';
import TablePaginationBar from '../../components/Ui/Table/TablePaginationBar';
import ProductSearchBar from '../../components/Ui/search/ProductSearchBar';


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
    <div className="py-3 space-y-3">
      <div className="py-3 border-b bg-white">
  {/* Top Row: PRODUCTS Title & Advanced Toggle */}
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-bold text-black">PRODUCTS</h2>
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-700">Advanced Mode</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={showAdvancedSearch}
          onChange={() => setShowAdvancedSearch(!showAdvancedSearch)}
        />
        <div className="w-11 h-6 bg-primary-base rounded-full peer-focus:outline-none transition duration-300">
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 ${
              showAdvancedSearch ? 'left-5 bg-white' : 'left-0.5 bg-white'
            }`}
          />
        </div>
      </label>
    </div>
  </div>
</div>
  {/* Bottom Row: Breadcrumb */}
  <div className='py-2 border-b bg-white'>
    <p className="text-sm font-semibold text-gray-700">Catalog Setup &gt; Manage Products</p>
  </div>
  
      {/* Search Bar */}
      <div>
        <ProductSearchBar ourStock={56} supplierStock={5} backOrder={12} />

      </div>

      {showAdvancedSearch && (
  <div className="flex flex-wrap gap-4 w-full">
    <div className="flex-1 min-w-[320px] max-w-[40%]">
      <AdvancedSearch />
    </div>
    <div className="flex-1 min-w-[280px] max-w-[30%]">
      <BatchEdit />
    </div>
    <div className="flex-1 min-w-[260px] max-w-[30%]">
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