import React from 'react';
import SortUp from '../../../assets/svgIcons/Sort-Up-Thin.svg';
import SortDown from '../../../assets/svgIcons/Sort-Down-Thin.svg';
import Funnel from '../../../assets/svgIcons/Funnel-Thin.svg';


const MainTable = ({ columns, data, selectedRows, onRowSelect, onCheckboxToggle, onFilterChange }) => {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-300">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border text-center">
              <input type="checkbox" onChange={e => onRowSelect('all', e.target.checked)} />
            </th>
            {columns.map(col => (
              <th key={col.key} className="p-2 text-left border whitespace-nowrap">
                <div className="flex items-center justify-between">
                  <span>{col.label}</span>
                  <div className="flex flex-col items-center ml-2">
                    <img src={SortUp} alt="Sort Up" className="w-3 h-3 cursor-pointer" />
                    {/* <img src={SortDown} alt="Sort Down" className="w-3 h-3 cursor-pointer" /> */}
                  </div>
                </div>
              </th>
            ))}
          </tr>
          <tr className="bg-white">
            <td
              className="p-2 text-blue-500 border text-center cursor-pointer bg-gray-200"
              onClick={() => onFilterChange('clear')}
            >
              Clear
            </td>
            {columns.map(col => (
              <td key={col.key} className="p-1 border bg-gray-200">
                {col.type === 'checkbox' ? null : (
                  <div className="flex items-center gap-1 ">
                    <input
                      type="text"
                      className="w-full border px-2 py-1 text-xs rounded"
                      placeholder=""
                      onChange={e => onFilterChange(col.key, e.target.value)}
                    />
                    <div className="bg-gray-200 p-1 rounded">
                      <img src={Funnel} alt="Filter" className="w-5 h-5" />
                    </div>
                  </div>
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
                className={`border text-sm ${isSelected ? 'text-black' : 'hover:bg-primary-base hover:text-white'}`}
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
