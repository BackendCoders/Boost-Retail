import React, { useState } from "react";

const ToggleButton = ({ value, onChange }) => {
  return (
    <div className="flex border rounded-full overflow-hidden w-[76px] h-[26px]">
      {["AND", "OR"].map((val) => (
        <button
          key={val}
          className={`w-1/2 text-xs font-bold transition duration-150 ${
            value === val
              ? "bg-[#007bff] text-white"
              : "text-black hover:bg-gray-100"
          }`}
          onClick={() => onChange(val)}
        >
          {val}
        </button>
      ))}
    </div>
  );
};

const ConditionRow = ({ field = "Category 1", operator = "Equals", value = "E-Bike", onRemove }) => {
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
      <button
        onClick={onRemove}
        className="text-gray-500 hover:text-red-600 text-sm font-bold"
      >
        ✕
      </button>
    </div>
  );
};

const ConditionGroup = ({ nested = false, onRemoveGroup }) => {
  const [logic, setLogic] = useState("AND");
  const [conditions, setConditions] = useState([
    { id: 1, field: "Category 1", operator: "Equals", value: "E-Bike" },
    { id: 2, field: "Category 1", operator: "Contains", value: "Bike" },
  ]);
  const [showNested, setShowNested] = useState(!nested);

  const removeCondition = (id) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };

  return (
    <div
      className={`rounded-lg p-3 mt-3 ${
        nested ? "bg-white border border-gray-300" : "bg-[#f7f7f7] border"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <ToggleButton value={logic} onChange={setLogic} />
        <button className="ml-1 text-xl font-bold text-gray-500 hover:text-black">
          +
        </button>
        {nested && (
          <button
            onClick={onRemoveGroup}
            className="ml-auto text-xl font-bold text-gray-500 hover:text-red-600"
          >
            ✕
          </button>
        )}
      </div>

      {conditions.map((cond) => (
        <ConditionRow
          key={cond.id}
          field={cond.field}
          operator={cond.operator}
          value={cond.value}
          onRemove={() => removeCondition(cond.id)}
        />
      ))}

      {showNested && (
        <div className="ml-6 border-l border-dashed border-gray-400 pl-4">
          <ConditionGroup
            nested={true}
            onRemoveGroup={() => setShowNested(false)}
          />
        </div>
      )}
    </div>
  );
};

const AdvancedSearch = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg w-full border border-gray-300 min-h-[313px]">
      <h2 className="font-semibold text-base mb-4">Advanced Search</h2>
      <ConditionGroup />
    </div>
  );
};

export default AdvancedSearch;
