import React from 'react';

const TableCheckbox = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 accent-blue-600"
    />
  );
};

export default TableCheckbox;