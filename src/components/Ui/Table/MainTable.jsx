import React, { useState } from 'react';
import SortUp from '../../../assets/svgIcons/Sort-Up-Thin.svg';
import SortDown from '../../../assets/svgIcons/Sort-Down-Thin.svg';
import Funnel from '../../../assets/svgIcons/Funnel-Thin.svg';

const MainTable = ({ columns, data, selectedRows, onRowSelect, onCheckboxToggle, onFilterChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [filters, setFilters] = useState({});

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = ''; // Clear sorting
    }
    setSortConfig({ key, direction });
    onFilterChange('sort', { key, direction });
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(key, value);
  };

  const handleClearFilters = () => {
    const cleared = {};
    columns.forEach(col => {
      if (col.type !== 'checkbox') cleared[col.key] = '';
    });
    setFilters(cleared);
    onFilterChange('clear');
  };

  return (
    <div className="overflow-x-auto rounded-md border border-gray-300">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-white">
          <tr>
            <th className="p-4 border text-center">
              <input type="checkbox" onChange={e => onRowSelect('all', e.target.checked)} />
            </th>
            {columns.map(col => {
              const isSortedCol = sortConfig.key === col.key;
              return (
                <th key={col.key} className="p-2 text-left border whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => handleSort(col.key)}>
                    <span>{col.label}</span>
                    <div className="ml-2">
                      {/* Show only the correct arrow */}
                      {isSortedCol && sortConfig.direction === 'desc' ? (
                        <img src={SortDown} alt="Sort Desc" className="w-3 h-3" />
                      ) : (
                        <img src={SortUp} alt="Sort Asc" className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>

          <tr className="bg-white">
            <td
              className="p-4 text-blue-500 border text-center cursor-pointer bg-gray-200"
              onClick={handleClearFilters}
            >
              Clear
            </td>
            {columns.map(col => (
              <td key={col.key} className="p-1 border bg-gray-200">
                {col.type === 'checkbox' ? null : (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={filters[col.key] || ''}
                      className="w-full border px-2 py-1 text-xs rounded"
                      onChange={e => handleFilterChange(col.key, e.target.value)}
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
          {data.map(row => {
            const isSelected = selectedRows.includes(row.id);
            return (
              <tr
                key={row.id}
                className={`border text-sm ${isSelected ? 'text-black' : 'hover:bg-primary-base hover:text-white'}`}
              >
                <td className="p-4 text-center border">
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
