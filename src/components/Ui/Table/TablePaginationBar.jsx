import React, { useState, useRef, useEffect } from 'react';
import settingIcon from '../../../assets/whitesvgicons/setting.svg';
import FilterDropdown from './FilterDropdown';

const TablePaginationBar = ({
  currentPage,
  totalPages,
  productsPerPage,
  onPageChange,
  onPerPageChange,
  availableColumns = ['Part Number', 'MPN', 'Title', 'Make', 'Size', 'Colour', 'Year', 'Cost'],
  selectedColumns,
  onColumnsChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const btnWrapperRef = useRef(null);

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
    <div className="flex items-center justify-between bg-white text-data-body font-inter text-text-body px-4 py-2">
      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          className="bg-primary-base text-white px-3 py-1 rounded-full disabled:opacity-50"
          onClick={() => onPageChange('prev')}
          disabled={currentPage === 1}
        >
          ‹ PREV
        </button>

        <div className="border border-border-grid px-3 py-1 rounded-md text-text-body">
          Page {currentPage}
        </div>

        <span className="text-text-placeholder">of {totalPages}</span>

        <button
          className="bg-primary-base text-white px-3 py-1 rounded-full disabled:opacity-50"
          onClick={() => onPageChange('next')}
          disabled={currentPage === totalPages}
        >
          NEXT ›
        </button>
      </div>

      {/* Per-Page Selector & Settings */}
      <div className="flex items-center gap-4">
        <label className="text-text-body font-inter">Products Per Page</label>

        <select
          className="border border-border-input px-2 py-1 rounded-md text-text-body outline-none focus:ring-1 focus:ring-primary-base"
          value={productsPerPage}
          onChange={(e) => onPerPageChange(+e.target.value)}
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        {/* Gear Icon + Dropdown */}
        <div className="relative" ref={btnWrapperRef}>
          <button
            className="bg-primary-base p-2 rounded-md flex items-center justify-center"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <img src={settingIcon} alt="Settings" className="w-5 h-5" />
          </button>

          {showFilters && (
            <div className="absolute right-0 top-12 z-30 bg-white shadow-lg border border-border-grid rounded-md">
              <FilterDropdown
                availableColumns={availableColumns}
                initialSelected={selectedColumns}
                onApply={handleApply}
                onCancel={() => setShowFilters(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TablePaginationBar;
