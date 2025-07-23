import React from "react";
import SearchGroup from "./SearchGroup";

const AdvancedSearch = () => {
  return (
    <div className="p-5 bg-gray-100 rounded-lg w-full max-w-md border border-gray-300">
      <h2 className="font-semibold text-base mb-4">Advanced Search</h2>
      <SearchGroup />
    </div>
  );
};

export default AdvancedSearch;
