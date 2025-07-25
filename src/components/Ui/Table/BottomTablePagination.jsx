import React, { useState, useRef, useEffect } from 'react';

const BottomTablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
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
    </div>
  );
};

export default BottomTablePagination;
