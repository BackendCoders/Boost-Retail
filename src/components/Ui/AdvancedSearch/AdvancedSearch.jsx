import React from "react";

const ConditionRow = ({ field = "Category 1", operator = "Equals", value = "E-Bike" }) => {
  return (
    <div className="flex gap-2 mb-2 items-center">
      <select className="border rounded px-2 py-1 text-sm w-40">
        <option>{field}</option>
      </select>
      <select className="border rounded px-2 py-1 text-sm w-36">
        <option>{operator}</option>
      </select>
      <input
        className="border rounded px-2 py-1 text-sm w-40"
        defaultValue={value}
      />
      <button className="text-gray-500 hover:text-red-600 text-sm font-bold">x</button>
    </div>
  );
};

const ConditionGroup = ({ nested = false }) => {
  return (
    <div
      className={`border rounded-lg p-3 ${
        nested ? "ml-6 mt-3 bg-white border-dashed" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <button className="px-3 py-1 rounded bg-blue-500 text-white text-xs font-semibold">
          AND
        </button>
        <button className="px-3 py-1 rounded text-xs text-gray-600 hover:bg-gray-200 font-semibold">
          OR
        </button>
        <button className="ml-auto text-green-600 hover:underline text-sm font-bold">
          +
        </button>
        {nested && (
          <button className="ml-1 text-red-600 hover:underline text-sm font-bold">
            x
          </button>
        )}
      </div>

      {/* Example rows */}
      <ConditionRow field="Category 1" operator="Equals" value="E-Bike" />
      <ConditionRow field="Category 1" operator="Contains" value="Bike" />

      {/* Nested Group */}
      {!nested && (
        <ConditionGroup nested={true}>
          <ConditionRow field="Price" operator=">=" value="£2500" />
        </ConditionGroup>
      )}
    </div>
  );
};

const AdvancedSearch = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg border border-gray-300 w-full max-w-8xl mx-auto min-h-[313px]">
      <h2 className="font-semibold text-base mb-4">Advanced Search</h2>
      <ConditionGroup />
    </div>
  );
};

export default AdvancedSearch;
