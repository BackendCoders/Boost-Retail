// File: Ui/Table/ProductTable.jsx
import React from 'react';
import TableCheckbox from './TableCheckbox';

const ProductTable = ({ columns, data, onSelectRow }) => {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th></th>
          {columns.map((col, index) => (
            <th key={index}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={item.id || idx} className={item.highlight ? "bg-blue-100" : ""}>
            <td>
              <TableCheckbox
                checked={item.selected}
                onChange={() => onSelectRow(idx)}
              />
            </td>
            {columns.map((col, index) => (
              <td key={index}>
                {col.type === 'checkbox' ? (
                  <input type="checkbox" checked={item[col.key]} readOnly />
                ) : col.prefix || col.suffix ? (
                  `${col.prefix || ''}${item[col.key]}${col.suffix || ''}`
                ) : (
                  item[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;