import React, { useState } from "react";
import ConditionRow from "./ConditionRow";

const SearchGroup = () => {
  const [conditions, setConditions] = useState([
    { id: 1, field: "", operator: "", value: "" },
    { id: 2, field: "", operator: "", value: "" },
  ]);
  const [subGroup, setSubGroup] = useState(true);

  const handleAdd = () => {
    setConditions((prev) => [
      ...prev,
      { id: Date.now(), field: "", operator: "", value: "" },
    ]);
  };

  const handleDelete = (id) => {
    setConditions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white border rounded-md p-4 space-y-3">
      {/* AND / OR Buttons */}
      <div className="flex items-center gap-2 mb-2">
        <button className="bg-primary-base text-white px-3 py-1 rounded text-sm font-medium">
          AND
        </button>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium">
          OR
        </button>
        <button
          onClick={handleAdd}
          className="text-xl text-gray-600 hover:text-black"
        >
          +
        </button>
      </div>

      {/* List of Condition Rows */}
      <div className="space-y-2">
        {conditions.map((item) => (
          <ConditionRow
            key={item.id}
            id={item.id}
            onDelete={() => handleDelete(item.id)}
          />
        ))}

        {/* Nested Group Example */}
        {subGroup && (
          <div className="border-l-4 border-dashed border-gray-300 pl-4 mt-3 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium">
                AND
              </button>
              <button className="bg-primary-base text-white px-3 py-1 rounded text-sm font-medium">
                OR
              </button>
              <button className="text-xl text-gray-600 hover:text-black">+</button>
              <button className="text-xl text-gray-600 hover:text-black">×</button>
            </div>

            <ConditionRow id="nested-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchGroup;
