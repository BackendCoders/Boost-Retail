import React, { useState, useRef, useEffect } from 'react';
import settingIcon from '../../../assets/whitesvgicons/setting.svg';
import leftArrow from '../../../assets/whitesvgicons/leftarrow.svg';
import rightArrow from '../../../assets/whitesvgicons/rightarrow.svg';
import DownThin from '../../../assets/svgIcons/Down-Thin.svg'
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
    <div className="flex items-center justify-between bg-white px-4 py-2">
      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
  <button
    className="bg-primary-base text-white px-3 py-1 rounded-full disabled:opacity-50 flex items-center"
    onClick={() => onPageChange('prev')}
    disabled={currentPage === 1}
  >
    <img src={leftArrow} alt="Previous" className="w-5 h-6" />
    <span>PREV</span>
  </button>

  <div className="border border-border-grid px-3 py-1 rounded-md text-text-body">
    Page {currentPage}
  </div>

  <span className="text-text-placeholder">of {totalPages}</span>

  <button
    className="bg-primary-base text-white px-3 py-1 rounded-full disabled:opacity-50 flex items-center"
    onClick={() => onPageChange('next')}
    disabled={currentPage === totalPages}
  >
    <span>NEXT</span>
    <img src={rightArrow} alt="Next" className="w-5 h-6" />
  </button>
</div>


      {/* Per-Page Selector & Settings */}
      <div className="flex items-center gap-4">
        <label className="text-text-body font-inter">Products Per Page</label>

        <div className="relative">
    <select
      className="appearance-none border border-border-input px-3 py-1 pr-8 rounded-md text-text-body outline-none focus:ring-1 focus:ring-primary-base"
      value={productsPerPage}
      onChange={(e) => onPerPageChange(+e.target.value)}
    >
      {[10, 20, 50, 100].map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
    <img
      src={DownThin}
      alt="Dropdown"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-6"
    />
  </div>

        {/* Gear Icon + Dropdown */}
        <div className="relative" ref={btnWrapperRef}>
          <button
            className="bg-primary-base p-2 rounded-md flex items-center justify-center"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <img src={settingIcon} alt="Settings" className="w-7 h-7" />
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
