// File: Ui/Table/MainTable.jsx
import React from 'react';

const MainTable = ({ columns, data, selectedRows, onRowSelect, onCheckboxToggle, onFilterChange }) => {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border">
              <input type="checkbox" onChange={e => onRowSelect('all', e.target.checked)} />
            </th>
            {columns.map(col => (
              <th key={col.key} className="p-2 text-left border whitespace-nowrap">
                <div className="flex items-center justify-between">
                  {col.label}
                  <span className="text-gray-400 text-xs">&#8597;</span>
                </div>
              </th>
            ))}
          </tr>
          <tr className="bg-white">
            <td className="p-2 text-blue-500 border cursor-pointer" onClick={() => onFilterChange('clear')}>Clear</td>
            {columns.map(col => (
              <td key={col.key} className="p-1 border">
                {col.type === 'checkbox' ? null : (
                  <input
                    type="text"
                    className="w-full border px-2 py-1 text-xs rounded"
                    placeholder=""
                    onChange={e => onFilterChange(col.key, e.target.value)}
                  />
                )}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isSelected = selectedRows.includes(row.id);
            return (
              <tr
                key={row.id}
                className={`border text-sm ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'}`}
              >
                <td className="p-2 text-center border">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={e => onRowSelect(row.id, e.target.checked)}
                  />
                </td>
                {columns.map(col => (
                  <td key={col.key} className="p-2 border text-center">
                    {col.type === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={row[col.key]}
                        onChange={e => onCheckboxToggle(row.id, col.key, e.target.checked)}
                      />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;