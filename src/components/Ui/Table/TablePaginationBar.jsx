import React, { useState, useRef, useEffect } from 'react';
import settingIcon from '../../../assets/whitesvgicons/setting.svg';
import FilterDropdown from './FilterDropdown';

const TablePaginationBar = ({
  currentPage,
  totalPages,
  productsPerPage,
  onPageChange,
  onPerPageChange,
  availableColumns = ['Part Number','MPN','Title','Make','Size','Colour','Year','Cost'],
  selectedColumns,
  onColumnsChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const btnWrapperRef = useRef(null);

  // close dropdown when clicking outside the button wrapper
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (btnWrapperRef.current && !btnWrapperRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = (newCols) => {
    onColumnsChange(newCols);
    setShowFilters(false);
  };

  return (
    <div className="flex items-center justify-between bg-white text-sm p-2">
      {/* --- Pagination Controls --- */}
      <div className="flex items-center space-x-2">
        <button
          className="bg-primary-base text-white px-3 py-1 rounded-2xl disabled:opacity-50"
          onClick={() => onPageChange('prev')}
          disabled={currentPage === 1}
        >
          ‹ PREV
        </button>
        <div className="border px-2 py-1 rounded">Page {currentPage}</div>
        <span className="text-gray-500">of {totalPages}</span>
        <button
          className="bg-primary-base text-white px-3 py-1 rounded-2xl disabled:opacity-50"
          onClick={() => onPageChange('next')}
          disabled={currentPage === totalPages}
        >
          NEXT ›
        </button>
      </div>

      {/* --- Per‑Page Selector + Settings --- */}
      <div className="flex items-center space-x-2">
        <label className="text-gray-700">Products Per Page</label>
        <select
          className="border px-2 py-1 rounded"
          value={productsPerPage}
          onChange={e => onPerPageChange(+e.target.value)}
        >
          {[10, 20, 50, 100].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        {/* gear button + dropdown */}
        <div className="relative" ref={btnWrapperRef}>
          <button
            className="bg-primary-base text-white p-2 rounded"
            onClick={() => setShowFilters(f => !f)}
          >
            <img src={settingIcon} alt="Settings" className="w-6 h-6" />
          </button>

          {showFilters && (
            <FilterDropdown
              className="absolute top-full mt-1 right-0 z-10"
              availableColumns={availableColumns}
              initialSelected={selectedColumns}
              onApply={handleApply}
              onCancel={() => setShowFilters(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TablePaginationBar;
