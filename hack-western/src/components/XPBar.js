// XPBar.js
import React from 'react';

const XPBar = ({ currentXP, maxXP, xpLevel }) => {
  const calculatePercentage = () => {
    return (currentXP / maxXP) * 100;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-gray-200 overflow-hidden">
      <div
        className="h-full bg-blue-300"
        style={{ width: `${calculatePercentage()}%` }}
      />
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full text-white">
        <p className="text-black text-xl font-bold">{`Level ${xpLevel}`}</p>
      </div>
    </div>
  );
};

export default XPBar;
