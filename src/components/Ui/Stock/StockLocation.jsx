import React from "react";

const tableHeaders = ["LOC", "QTY", "MIN", "MAX", "BO", "SOLD", "LA"];
const tableData = [
  { LOC: "01", QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
  { LOC: "02", QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
  { LOC: "03", QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
  { LOC: "04", QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
  { LOC: "05", QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
  { LOC: "06", QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 },
];

const calculateTotals = () => {
  const totals = { QTY: 0, MIN: 0, MAX: 0, BO: 0, SOLD: 0, LA: 0 };
  tableData.forEach((row) => {
    Object.keys(totals).forEach((key) => {
      totals[key] += row[key];
    });
  });
  return totals;
};

const StockLocation = () => {
  const totals = calculateTotals();

  return (
    <div className="p-4 border rounded-md bg-white shadow w-full max-w-md">
      <h2 className="font-bold text-lg mb-4">Stock Location</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-sm">
              {tableHeaders.map((header) => (
                <th key={header} className="px-3 py-2 border text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="text-center border-t">
                {tableHeaders.map((header) => (
                  <td key={header} className="px-3 py-2 border">
                    {row[header] ?? row[header.toUpperCase()]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="font-bold border-t">
              <td className="px-3 py-2 border text-left">Total</td>
              {["QTY", "MIN", "MAX", "BO", "SOLD", "LA"].map((key) => (
                <td key={key} className="px-3 py-2 border text-center">
                  {totals[key]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockLocation;
