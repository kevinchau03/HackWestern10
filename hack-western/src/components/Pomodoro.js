import React, { useState, useEffect } from 'react';

const PomodoroTimer = ({ userData, updateUserData, addExperience }) => {
  const [totalSeconds, setTotalSeconds] = useState(10); // 10 minutes in seconds
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [grindComplete, setGrindComplete] = useState(false);

  let interval;


  const resetTimer = () => {
    clearInterval(interval);
    setIsActive(false);
    setGrindComplete(false);
    setElapsedSeconds(0);
  };

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        if (elapsedSeconds === totalSeconds) {
          clearInterval(interval);
          setIsActive(false);
          setGrindComplete(true);
          addExperience(60);
          resetTimer();
        } else {
          setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [isActive, elapsedSeconds, totalSeconds, addExperience, resetTimer]);
  
  
  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const calculateProgress = () => {
    return (elapsedSeconds / totalSeconds) * 100;
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <svg width="100" height="100" className="mb-4">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#ddd"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#4CAF50"
          strokeWidth="5"
          strokeDasharray="283"
          strokeDashoffset={283 - (calculateProgress() * 283) / 100}
          fill="none"
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20">
          {totalSeconds - elapsedSeconds}
        </text>
      </svg>
      <div className="mt-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
