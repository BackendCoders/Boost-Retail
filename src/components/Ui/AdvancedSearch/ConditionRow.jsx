import React from "react";

const ConditionRow = ({ id, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <select className="border rounded px-2 py-1 text-sm bg-white w-32">
        <option>Category 1</option>
        <option>Price</option>
      </select>

      <select className="border rounded px-2 py-1 text-sm bg-white w-28">
        <option>Equals</option>
        <option>Contains</option>
        <option>&gt;=</option>
      </select>

      <input
        type="text"
        className="border rounded px-2 py-1 text-sm w-32"
        placeholder="Enter value"
      />

      {onDelete && (
        <button
          onClick={onDelete}
          className="text-lg text-gray-600 hover:text-black"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ConditionRow;
