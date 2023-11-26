// XPBar.js
import React from 'react';

const XPBar = ({ currentXP, xpLevel }) => {
  const calculatePercentage = () => {
    return (currentXP / 100) * 100;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-gray-200 overflow-hidden border-4 border-black">
      <div
        className="h-full bg-purple-400" // Apply rounded-md to round inner corners
        style={{ width: `${calculatePercentage()}%` }}
      />
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full text-white">
        <p className="text-black text-xl font-bold">{`Level ${xpLevel}`}</p>
      </div>
    </div>
  );
};

export default XPBar;

