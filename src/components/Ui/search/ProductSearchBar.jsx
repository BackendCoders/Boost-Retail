import React from "react";

// ✅ Reusable Toggle Component
const ToggleSwitch = ({ label, checked = true }) => (
  <label className="flex items-center text-sm text-gray-700 gap-1">
    <input
      type="checkbox"
      checked={checked}
      readOnly
      className="accent-primary-base w-4 h-4"
    />
    {label}
  </label>
);

const ProductSearchBar = () => {
  return (
    <div className="flex items-center justify-between bg-white gap-4">
      {/* Left: Search + Filters */}
     <div className="flex flex-col gap-1 px-1 py-3 bg-white">
      <p className="text-sm font-bold text-black">Search</p>

      {/* Search Row */}
      <div className="flex items-center gap-3">
        {/* Input */}
        <input
          type="text"
          placeholder="Enter Part Number / MPN / Barcode / Title"
          className="w-[360px] px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary-base"
        />

        {/* Refresh Icon */}
        <button
          type="button"
          className="text-gray-500 hover:text-black text-lg"
          title="Refresh"
        >
          ↻
        </button>

        {/* Checkboxes */}
        <ToggleSwitch label="EPOS" />
        <ToggleSwitch label="SIM" />
      </div>
    </div>

      {/* Right: Stock Summary Cards */}
      <div className="flex items-center gap-3">
        {/* Our Stock */}
        <div>
        <div className="w-16 h-16 border border-primary-base rounded-md flex flex-col items-center justify-center text-xs text-primary-base font-medium">
          <span className="text-lg font-bold">56</span>
          
        </div>
        <p className="text-sm">Our Stock</p>
        </div>

        {/* Supplier Stock */}
        <div>
        <div className="w-16 h-16 border border-primary-base rounded-md flex flex-col items-center justify-center text-xs text-primary-base font-medium">
          <span className="text-lg font-bold">5</span>
        </div>
        <p className="text-sm">Supp Stock</p>
        </div>

        {/* Back Order */}
        <div>
        <div className="w-16 h-16 border border-primary-base rounded-md flex flex-col items-center justify-center text-xs text-primary-base font-medium">
          <span className="text-lg font-bold">12</span>
        </div>
        <p className="text-sm">Back Order</p>
        </div>

        {/* Image Placeholder */}
        <div className="w-36 h-24 border border-gray-300 rounded-md flex items-center justify-center text-lg text-gray-400">
          Image
        </div>
      </div>
    </div>
  );
};

export default ProductSearchBar;
