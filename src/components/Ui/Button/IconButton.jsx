// File: Ui/Button/IconButton.jsx
import React from 'react';

const IconButton = ({ icon: Icon, onClick, title = '', className = '' }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 transition-all ${className}`}
    >
      {Icon && <Icon size={18} />}
    </button>
  );
};

export default IconButton;