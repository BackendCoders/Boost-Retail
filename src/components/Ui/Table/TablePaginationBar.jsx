// File: Ui/Table/TablePaginationBar.jsx
import React from 'react';

const TablePaginationBar = ({ currentPage, totalPages, productsPerPage, onPageChange, onPerPageChange }) => {
  return (
    <div className="flex items-center justify-between bg-white text-sm">
      <div className="flex items-center space-x-2">
        <button
          className="bg-primary-base text-white px-3 py-1 rounded"
          onClick={() => onPageChange('prev')}
          disabled={currentPage === 1}
        >
          &#x276E; PREV
        </button>
        <div className="border px-2 py-1 rounded">Page {currentPage}</div>
        <span className="text-gray-500">of {totalPages}</span>
        <button
          className="bg-primary-base text-white px-3 py-1 rounded"
          onClick={() => onPageChange('next')}
          disabled={currentPage === totalPages}
        >
          NEXT &#x276F;
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-gray-700">Products Per Page</label>
        <select
          className="border px-2 py-1 rounded"
          value={productsPerPage}
          onChange={e => onPerPageChange(parseInt(e.target.value))}
        >
          {[10, 20, 50, 100].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button className="bg-primary-base text-white p-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TablePaginationBar;
