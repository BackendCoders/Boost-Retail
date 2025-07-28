import React from 'react';

const CategoryEditPanel = () => {
  return (
    <div className="w-1/2 p-4">
      <h3 className="text-md font-semibold mb-4">Edit Details</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name:</label>
        <input className="mt-1 w-full border px-3 py-1 rounded text-sm" placeholder="Category Name" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Parent category:</label>
        <select className="mt-1 w-full border px-3 py-1 rounded text-sm">
          <option>Parent Name</option>
        </select>
      </div>
      <div className="mb-4 text-sm">
        <p><strong>Number of products:</strong></p>
        <p className="text-gray-600">Lookup tables:</p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Table name</li>
          <li>Table name</li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryEditPanel;
