import React from 'react';

const SearchInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;