// File: Ui/Table/TableColumnFilter.jsx
import React from 'react';

const TableColumnFilter = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  options = [],
}) => {
  if (type === 'select') {
    return (
      <select
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 border rounded-md focus:outline-none"
      >
        <option value="">All</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-2 py-1 border rounded-md focus:outline-none"
    />
  );
};

export default TableColumnFilter;