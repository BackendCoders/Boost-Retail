import React from "react";
import SearchGroup from "./SearchGroup";

const AdvancedSearch = () => {
  return (
    <div className="p-4 border rounded-md bg-gray-100 w-full max-w-4xl">
      <h2 className="font-semibold text-base mb-4">Advanced Search</h2>
      <SearchGroup />
    </div>
  );
};

export default AdvancedSearch;
