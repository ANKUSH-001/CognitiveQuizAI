import React from 'react';
import "../utils/animations.css"

const Loader = ({ size = 'medium', color = 'blue', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    red: 'border-red-500'
  };

  const colorTextClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    red: 'text-red-600'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`
          animate-spin rounded-full
          border-t-2 border-b-2
          ${sizeClasses[size]}
          ${colorClasses[color]}
        `}
      />
      {text && (
        <p className={`mt-4 ${colorTextClasses[color]} text-sm font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
