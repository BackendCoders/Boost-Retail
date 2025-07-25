import React, { useState, useRef, useEffect } from 'react';
import SortUp from '../../../assets/svgIcons/Sort-Up-Thin.svg';
import SortDown from '../../../assets/svgIcons/Sort-Down-Thin.svg';
import Funnel from '../../../assets/svgIcons/Funnel-Thin.svg';

// Filter options by column type
const textFilterOptions = [
  'Contains',
  'Starts with',
  'Equals',
  'Ends with',
  'Not contain',
  'Not equal'
];

const numberFilterOptions = [
  'Equals',
  'Greater than',
  'Less than',
  'Greater or equal',
  'Less or equal',
  'Not equal'
];

const MainTable = ({
  columns,
  data,
  selectedRows,
  onRowSelect,
  onCheckboxToggle,
  onFilterChange
}) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [filters, setFilters] = useState({});
  const [activeFilterCol, setActiveFilterCol] = useState(null);
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setActiveFilterCol(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = '';
    }
    setSortConfig({ key, direction });
    onFilterChange('sort', { key, direction });
  };

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(key, value);
  };

  const handleClearFilters = () => {
    const cleared = {};
    columns.forEach(col => {
      if (col.type !== 'checkbox') cleared[col.key] = '';
    });
    setFilters(cleared);
    onFilterChange('clear');
    setActiveFilterCol(null);
  };

  const handleFilterOptionSelect = (colKey, option) => {
    onFilterChange(`${colKey}_filterType`, option);
    setActiveFilterCol(null);
  };

  return (
    <div
      ref={wrapperRef}
      className="overflow-x-auto rounded-md border border-gray-300 relative"
    >
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-white">
          {/* Sortable headers */}
          <tr>
            <th className="p-4 border text-center">
              <input
                type="checkbox"
                onChange={e => onRowSelect('all', e.target.checked)}
              />
            </th>
            {columns.map(col => {
              const isSorted = sortConfig.key === col.key;
              return (
                <th
                  key={col.key}
                  className="p-2 text-left border whitespace-nowrap"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleSort(col.key)}
                  >
                    <span>{col.label}</span>
                    <div className="ml-2">
                      {isSorted && sortConfig.direction === 'desc' ? (
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

          {/* Filter row */}
          <tr className="bg-gray-300">
            <td
              className="p-4 text-blue-500 font-semibold border text-center cursor-pointer"
              onClick={handleClearFilters}
            >
              Clear
            </td>
            {columns.map(col => (
              <td key={col.key} className="p-1 border relative">
                {col.type !== 'checkbox' && (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={filters[col.key] || ''}
                      className="w-full border px-2 py-1 text-xs rounded"
                      onChange={e => handleFilterChange(col.key, e.target.value)}
                    />
                    <div
                      className="p-1 rounded cursor-pointer hover:bg-gray-300"
                      onClick={() =>
                        setActiveFilterCol(
                          activeFilterCol === col.key ? null : col.key
                        )
                      }
                    >
                      <img src={Funnel} alt="Filter" className="w-5 h-5" />
                    </div>

                    {/* Filter options dropdown */}
                    {activeFilterCol === col.key && (
                      <ul className="absolute top-full right-5 mt-1 bg-white rounded shadow-md z-10 text-xs max-h-52 overflow-y-auto">
                        {(col.type === 'number' ? numberFilterOptions : textFilterOptions).map(opt => (
                          <li
                            key={opt}
                            className="px-3 py-1 cursor-pointer hover:bg-gray-300"
                            onClick={() => handleFilterOptionSelect(col.key, opt)}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {data.map(row => {
            const isSelected = selectedRows.includes(row.id);
            return (
              <tr
                key={row.id}
                className={`border text-sm ${
                  isSelected
                    ? 'text-black bg-yellow-100'
                    : 'hover:bg-primary-base hover:text-white'
                }`}
              >
                <td className="p-4 text-center border">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={e =>
                      onRowSelect(row.id, e.target.checked)
                    }
                  />
                </td>
                {columns.map(col => (
                  <td key={col.key} className="p-2 border text-center">
                    {col.type === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={row[col.key]}
                        onChange={e =>
                          onCheckboxToggle(row.id, col.key, e.target.checked)
                        }
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
