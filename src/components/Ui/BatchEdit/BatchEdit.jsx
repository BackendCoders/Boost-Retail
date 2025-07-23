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
    console.log("Applying batch edit:", {
      selected,
      password,
      fields,
      values,
      applyEnding,
      saleReason,
    });
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg w-full max-w-md border border-gray-300">
      <h2 className="font-semibold text-base mb-4">Batch Edit</h2>

      <div className="flex items-center gap-2 mb-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border border-gray-300 p-2 rounded w-[120px] bg-white text-sm"
        >
          <option>Price</option>
          <option>Cost</option>
          <option>RRP</option>
        </select>
        <input
          type="password"
          placeholder="Enter Password"
          className="border border-gray-300 p-2 rounded flex-1 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleApply}
          className="bg-primary-base text-white px-4 py-2 rounded text-sm"
        >
          APPLY
        </button>
      </div>

      {Object.keys(fields).map((key) => (
        <div key={key} className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={fields[key]}
            onChange={() => handleCheckboxChange(key)}
            className="w-4 h-4"
          />
          <input
            type="text"
            value={values[key]}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            disabled={!fields[key]}
            className="border border-gray-300 p-2 rounded w-[120px] text-sm bg-white"
          />

          {key === "Web" && (
            <label className="flex items-center gap-2 ml-2 text-sm">
              <input
                type="checkbox"
                checked={applyEnding}
                onChange={() => setApplyEnding(!applyEnding)}
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
              className="border border-gray-300 p-2 rounded text-sm flex-1 bg-white"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BatchEdit;
