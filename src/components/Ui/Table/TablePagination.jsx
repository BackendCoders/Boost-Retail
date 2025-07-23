import React from 'react';

const TablePagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        PREV
      </button>
      <span className="mx-4">Page {currentPage} of {totalPages}</span>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        NEXT
      </button>
    </div>
  );
};

export default TablePagination;