import React, { useState, useEffect } from 'react';

const PomodoroTimer = ({ userData, updateUserData }) => {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [grindComplete, setGrindComplete] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [experienceAdded, setExperienceAdded] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            setGrindComplete(true);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  useEffect(() => {
    if (grindComplete && !experienceAdded) {
      updateUserData({
        ...userData,
        experience: userData.experience + 10,
      });
      setExperienceAdded(true);
    }
  }, [grindComplete, experienceAdded, updateUserData, userData]);

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setGrindComplete(false);
    setExperienceAdded(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleCustomTimeChange = (event) => {
    setCustomTime(event.target.value);
  };

  const startCustomTimer = () => {
    const totalSeconds = parseInt(customTime) * 60;
    setMinutes(Math.floor(totalSeconds / 60));
    setSeconds(totalSeconds % 60);
    setIsActive(true);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="text-4xl font-bold">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="mt-4">
        <div className="flex items-center mb-4">
          <label htmlFor="customTime" className="mr-2">
            Custom Time (minutes):
          </label>
          <input
            type="number"
            id="customTime"
            value={customTime}
            onChange={handleCustomTimeChange}
            className="border p-2"
          />
        </div>
        <button
          onClick={startCustomTimer}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
        >
          Start Custom Timer
        </button>
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
