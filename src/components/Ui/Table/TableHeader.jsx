import React from 'react';
import TableColumnFilter from './TableColumnFilter';

const TableHeader = ({ columns, filters, onFilterChange }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        <th></th>
        {columns.map((col, index) => (
          <th key={index} className="text-left p-2">
            <div className="flex flex-col">
              <span className="font-medium text-sm">{col.label}</span>
              {col.filterable && (
                <TableColumnFilter
                  type={col.filterType || 'text'}
                  value={filters[col.key] || ''}
                  onChange={(e) => onFilterChange(col.key, e.target.value)}
                  placeholder={`Filter ${col.label}`}
                  options={col.options || []}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;