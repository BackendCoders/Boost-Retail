import React, { useState } from 'react';

const FilterDropdown = ({
  availableColumns,
  initialSelected,
  onApply,
  onCancel,
}) => {
  const [selected, setSelected] = useState(() => new Set(initialSelected));

  const toggle = col => {
    const next = new Set(selected);
    next.has(col) ? next.delete(col) : next.add(col);
    setSelected(next);
  };

  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20"
    >
      <div className="p-2 font-medium">Filter results</div>
      <div className="max-h-50 overflow-y-auto px-2">
        {availableColumns.map(col => (
          <label key={col} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.has(col)}
              onChange={() => toggle(col)}
            />
            {col}
          </label>
        ))}
      </div>
      <div className="flex justify-end space-x-2 p-2 border-t">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded"
          onClick={() => onApply(Array.from(selected))}
        >
          APPLY
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => onCancel()}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;
