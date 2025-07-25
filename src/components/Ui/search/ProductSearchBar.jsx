import React from "react";
import RepeatIcon from "../../../assets/svgIcons/Repeat-Thin.svg";

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
    <div className="flex items-center justify-between bg-white gap-4 py-3">
      {/* Left: Search + Filters */}
      <div className="flex flex-col gap-1">
        <p className="page-heading font-bold text-black">Search</p>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Enter Part Number / MPN / Barcode / Title"
            className="w-[360px] px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary-base"
          />

          {/* Refresh Icon */}
          <button
            type="button"
            title="Refresh"
            className="p-2 rounded-md text-gray-500 hover:text-black hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
          >
            <img src={RepeatIcon} alt="Refresh" className="w-5 h-5" />
          </button>

          {/* Toggle Switches */}
          <ToggleSwitch label="EPOS" />
          <ToggleSwitch label="SIM" />
        </div>
      </div>

      {/* Right: Stock Summary Cards */}
      <div className="flex items-center gap-3">
        {/* Our Stock */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 border border-primary-base rounded-md flex items-center justify-center text-lg font-bold text-primary-base">
            56
          </div>
          <p className="text-sm text-black">Our Stock</p>
        </div>

        {/* Supplier Stock */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 border border-primary-base rounded-md flex items-center justify-center text-lg font-bold text-primary-base">
            5
          </div>
          <p className="text-sm text-black">Supp Stock</p>
        </div>

        {/* Back Order */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 border border-primary-base rounded-md flex items-center justify-center text-lg font-bold text-primary-base">
            12
          </div>
          <p className="text-sm text-black">Back Order</p>
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
