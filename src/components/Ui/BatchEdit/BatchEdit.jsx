import React, { useState } from "react";

const BatchEdit = () => {
  const [selected, setSelected] = useState("Price");
  const [password, setPassword] = useState("");
  const [fields, setFields] = useState({
    Cost: false,
    RRP: true,
    Price: false,
    Web: false,
    Sale: false,
  });
  const [values, setValues] = useState({
    Cost: "£10,000",
    RRP: "£10,000",
    Price: "£10,000",
    Web: "£10,000",
    Sale: "£10,000",
  });
  const [applyEnding, setApplyEnding] = useState(false);
  const [saleReason, setSaleReason] = useState("");

  const handleCheckboxChange = (field) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleApply = () => {
    console.log("Batch Edit:", {
      selected,
      password,
      fields,
      values,
      applyEnding,
      saleReason,
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-full border border-gray-300 min-h-[313px]">
      <h2 className="font-medium text-sm mb-3">Batch Edit</h2>

      <div className="flex items-center gap-2 mb-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded text-xs bg-white w-[90px]"
        >
          <option>Price</option>
          <option>Cost</option>
          <option>RRP</option>
        </select>

        <input
          type="password"
          placeholder="Enter Password"
          className="border border-gray-300 px-2 py-1 rounded text-xs flex-1 bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleApply}
          className="bg-primary-base hover:bg-primary-base text-white text-xs font-medium px-3 py-[6px] rounded-2xl"
        >
          APPLY
        </button>
      </div>

      {Object.keys(fields).map((key) => (
        <div key={key} className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={fields[key]}
            onChange={() => handleCheckboxChange(key)}
            className="w-3.5 h-3.5 accent-primary-base"
          />
          <input
            type="text"
            value={values[key]}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            disabled={!fields[key]}
            className={`border border-gray-300 px-2 py-1 rounded text-xs w-[90px] bg-white ${
              !fields[key] ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />

          {key === "Web" && (
            <label className="flex items-center gap-2 text-xs ml-2">
              <input
                type="checkbox"
                checked={applyEnding}
                onChange={() => setApplyEnding(!applyEnding)}
                className="accent-primary-base"
              />
              Apply £0.99 Ending
            </label>
          )}

          {key === "Sale" && (
            <input
              type="text"
              placeholder="Enter Sale Reason"
              value={saleReason}
              onChange={(e) => setSaleReason(e.target.value)}
              disabled={!fields["Sale"]}
              className={`border border-gray-300 px-2 py-1 rounded text-xs flex-1 bg-white ${
                !fields["Sale"] ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BatchEdit;
