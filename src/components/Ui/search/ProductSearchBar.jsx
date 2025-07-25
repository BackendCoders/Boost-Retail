import React from "react";
import RepeatIcon from "../../../assets/svgIcons/Repeat-Thin.svg";

// ✅ Reusable Toggle Component
const ToggleSwitch = ({ label, checked = true }) => (
  <label className="flex items-center text-form-field text-text-body gap-1">
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
    <div className="flex items-center justify-between bg-white gap-4 py-3 px-4">
      {/* Left: Search + Filters */}
      <div className="flex flex-col gap-1">
        <p className="text-page-heading text-text-title font-inter font-bold">
          Search
        </p>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Enter Part Number / MPN / Barcode / Title"
            className="w-[360px] px-3 py-2 rounded-md border border-border-input text-form-field text-text-body placeholder-text-placeholder outline-none focus:ring-1 focus:ring-primary-base font-inter"
          />

          {/* Refresh Icon */}
          <button
            type="button"
            title="Refresh"
            className="p-2 rounded-md text-text-body hover:text-text-title hover:bg-background-light transition-colors duration-200 flex items-center justify-center"
          >
            <img src={RepeatIcon} alt="Refresh" className="w-5 h-5" />
          </button>

          {/* Toggle Switches */}
          <ToggleSwitch label="EPOS" />
          <ToggleSwitch label="SIM" />
        </div>
      </div>

      {/* Right: Stock Summary Cards */}
      <div className="flex items-center gap-4">
        {[
          { label: "Our Stock", value: 56 },
          { label: "Supp Stock", value: 5 },
          { label: "Back Order", value: 12 },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 border border-primary-base rounded-md flex items-center justify-center text-lg font-bold text-primary-base">
              {value}
            </div>
            <p className="text-data-body text-text-title font-inter">{label}</p>
          </div>
        ))}

        {/* Image Placeholder */}
        <div className="w-36 h-24 border border-border-input rounded-md flex items-center justify-center text-lg text-text-placeholder font-inter">
          Image
        </div>
      </div>
    </div>
  );
};

export default ProductSearchBar;
