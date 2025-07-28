import React from 'react';

const dummyData = [
  {
    id: 1,
    name: "Category 1",
    count: 6000,
    children: [
      {
        id: 11,
        name: "Category 2",
        count: 1000,
        children: [
          {
            id: 111,
            name: "Category 3",
            count: 200,
            children: []
          },
        ]
      }
    ]
  }
];

const renderCategory = (cat, level = 1) => {
  return (
    <div key={cat.id} className={`pl-${level * 4} py-1`}>
      <div className={`flex items-center ${cat.count === 0 ? 'text-red-500' : ''}`}>
        <span>{cat.name}</span>
        <span className="ml-1 text-sm text-gray-400">({cat.count})</span>
        <span className="ml-2 text-blue-500 text-xs cursor-pointer">+ ✏️ 🗑️</span>
      </div>
      {cat.children?.map(child => renderCategory(child, level + 1))}
    </div>
  );
};

const CategoryTree = () => {
  return (
    <div className="w-1/2 p-4 border-r overflow-y-auto h-[calc(100vh-120px)]">
      <div className="flex justify-between mb-2">
        <input className="border px-2 py-1 rounded w-2/3 text-sm" placeholder="Search categories" />
        <select className="border px-2 py-1 rounded text-sm">
          <option>Show all</option>
          <option>Show has products</option>
          <option>Show has no products</option>
        </select>
      </div>
      <div className="text-xs text-gray-500 mb-2">Collapse All | Expand All</div>
      <div>
        {dummyData.map(cat => renderCategory(cat))}
      </div>
    </div>
  );
};

export default CategoryTree;
