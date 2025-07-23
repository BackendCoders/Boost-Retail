// File: Ui/Button/SecondaryButton.jsx
import React from 'react';

const SecondaryButton = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded border border-gray-400 text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;