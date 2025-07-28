import React from 'react';

const CategoryEditPanel = () => {
  return (
    <div className="w-[92%] bg-white p-6">
      <h3 className="text-lg font-semibold mb-6 pb-2">Edit Details</h3>

      {/* Name Field */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
        <input
          type="text"
          placeholder="Category Name"
          className="rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-2"
        /> 
      </div>

      {/* Parent Category Dropdown */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Parent category:</label>
        <select
          className="rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 border-2 focus:ring-blue-500"
        >
          <option>Parent Name</option>
        </select>
      </div>

      {/* Product Count & Lookup */}
      <div className="mb-5 text-sm text-gray-800">
        <p className="font-medium">Number of products:</p>
        <p className="mt-1 text-gray-600">Lookup tables:</p>
        <ul className="list-disc list-inside text-gray-600 mt-1">
          <li>Table name</li>
          <li>Table name</li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryEditPanel;
