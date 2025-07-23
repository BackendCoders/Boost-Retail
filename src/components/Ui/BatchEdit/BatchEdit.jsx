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
    setFields({ ...fields, [field]: !fields[field] });
  };

  const handleApply = () => {
    console.log("Applying batch edit with values:", {
      selected,
      password,
      fields,
      values,
      applyEnding,
      saleReason,
    });
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow w-full max-w-md">
      <h2 className="font-bold text-lg mb-4">Batch Edit</h2>

      <div className="flex gap-2 mb-3">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border p-2 rounded w-1/2"
        >
          <option>Price</option>
          <option>Cost</option>
          <option>RRP</option>
        </select>
        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2 rounded flex-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          APPLY
        </button>
      </div>

      {Object.keys(fields).map((key) => (
        <div className="flex items-center gap-2 mb-2" key={key}>
          <input
            type="checkbox"
            checked={fields[key]}
            onChange={() => handleCheckboxChange(key)}
          />
          <input
            type="text"
            value={values[key]}
            onChange={(e) =>
              setValues({ ...values, [key]: e.target.value })
            }
            disabled={!fields[key]}
            className="border p-2 rounded flex-1"
          />
          {key === "Web" && (
            <label className="flex items-center gap-1 ml-2">
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
              className="border p-2 rounded flex-1"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BatchEdit;
