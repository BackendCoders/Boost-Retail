// File: Ui/Table/TableRow.jsx
import React from 'react';
import TableCheckbox from './TableCheckbox';

const TableRow = ({ item, columns, index, onSelectRow }) => {
  return (
    <tr key={item.id || index} className={item.highlight ? 'bg-blue-100' : ''}>
      <td>
        <TableCheckbox
          checked={item.selected}
          onChange={() => onSelectRow(index)}
        />
      </td>
      {columns.map((col, colIdx) => (
        <td key={colIdx}>
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
  );
};

export default TableRow;