import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// छोटे SVG आइकॉन
const RuleIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const GroupIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M8 7a4 4 0 1 1 8 0M12 14v7M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ConditionRow = ({ field, operator, value, onRemove }) => (
  <div className="flex gap-2 mb-2 items-center">
    <select className="border rounded px-2 py-1 text-sm w-40" defaultValue={field}>
      <option>Category</option>
      <option>Price</option>
    </select>
    <select className="border rounded px-2 py-1 text-sm w-36" defaultValue={operator}>
      <option>Equals</option>
      <option>Contains</option>
      <option>&gt;=</option>
    </select>
    <input
      className="border rounded px-2 py-1 text-sm w-40"
      defaultValue={value}
    />
    <button onClick={onRemove} className="text-gray-500 hover:text-red-600 text-sm font-bold">
      ✕
    </button>
  </div>
);

const ConditionGroup = ({ nested = false, onRemoveGroup }) => {
  const [logic, setLogic] = useState("AND");
  const [conditions, setConditions] = useState([
    { id: uuidv4(), field: "Category", operator: "Equals", value: "E-Bike" },
    { id: uuidv4(), field: "Category", operator: "Contains", value: "Bike" },
  ]);
  const [nestedGroup, setNestedGroup] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const removeCondition = (id) => {
    setConditions((conds) => conds.filter((c) => c.id !== id));
  };

  const addRule = () => {
    setConditions((conds) => [
      ...conds,
      { id: uuidv4(), field: "Category", operator: "Equals", value: "" },
    ]);
    setMenuOpen(false);
  };

  const addGroup = () => {
    setNestedGroup(true);
    setMenuOpen(false);
  };

  return (
    <div
      className={`rounded-lg p-3 mt-3 ${
        nested ? "bg-white border border-gray-300 max-h-80 overflow-y-auto" : "bg-gray-50 border"
      }`}
    >
      <div className="flex items-center gap-2 mb-3 relative">
        <div className="flex border rounded-full overflow-hidden w-[76px] h-[26px]">
          {['AND', 'OR'].map((val) => (
            <button
              key={val}
              className={`w-1/2 text-xs font-bold transition duration-150 ${
                logic === val
                  ? "bg-blue-600 text-white"
                  : "text-black hover:bg-gray-100"
              }`}
              onClick={() => setLogic(val)}
            >
              {val}
            </button>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="ml-1 text-xl font-bold text-gray-500 hover:text-black"
        >
          +
        </button>
        {menuOpen && (
          <div className="absolute top-full left-16 mt-1 bg-white border border-gray-200 shadow-md rounded-sm z-10">
            <button
              onClick={addRule}
              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <RuleIcon />
              Rule
            </button>
            <button
              onClick={addGroup}
              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <GroupIcon />
              Group
            </button>
          </div>
        )}
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

      {nestedGroup && (
        <div className="ml-6 border-l border-dashed border-gray-400 pl-4">
          <ConditionGroup
            nested={true}
            onRemoveGroup={() => setNestedGroup(false)}
          />
        </div>
      )}
    </div>
  );
};

const AdvancedSearch = () => (
  <div className="p-4 bg-gray-100 rounded-lg w-full border border-gray-300 max-h-[320px] overflow-y-auto">
    <h2 className="font-semibold text-base mb-4">Advanced Search</h2>
    <ConditionGroup />
  </div>
);

export default AdvancedSearch;
