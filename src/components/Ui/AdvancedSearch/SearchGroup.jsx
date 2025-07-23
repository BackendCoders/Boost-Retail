import React, { useState } from "react";
import SearchRow from "./SearchRow";

const SearchGroup = () => {
  const [rows, setRows] = useState([{ id: 1 }]);

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  };

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 mb-2">
        <button className="px-3 py-1 bg-blue-500 text-white rounded">AND</button>
        <button className="px-3 py-1 bg-gray-200 text-black rounded">OR</button>
        <button
          onClick={addRow}
          className="px-2 py-1 bg-gray-300 rounded text-sm"
        >
          +
        </button>
      </div>

      {rows.map((row) => (
        <SearchRow key={row.id} rowId={row.id} onRemove={removeRow} />
      ))}
    </div>
  );
};

export default SearchGroup;
