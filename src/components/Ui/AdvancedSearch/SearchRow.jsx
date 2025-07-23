import React from "react";

const SearchRow = ({ rowId, onRemove }) => {
  return (
    <div className="flex items-center gap-2">
      <select className="border p-2 rounded w-40">
        <option>Category 1</option>
        <option>Price</option>
        <option>Brand</option>
      </select>
      <select className="border p-2 rounded w-32">
        <option>Equals</option>
        <option>Contains</option>
        <option>&gt;=</option>
        <option>&lt;=</option>
      </select>
      <input
        type="text"
        placeholder="Enter value"
        className="border p-2 rounded flex-1"
      />
      <button
        onClick={() => onRemove(rowId)}
        className="text-red-500 text-lg font-bold"
      >
        ×
      </button>
    </div>
  );
};

export default SearchRow;
