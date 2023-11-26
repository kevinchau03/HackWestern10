import React, { useState, useEffect } from 'react';
import PomodoroTimer from './components/Pomodoro';
import XPBar from './components/XPBar';
import Checklist from './components/Checklist';

export default function Main() {
  const [userData, setUserData] = useState({
    id: 1,
    name: "John Doe",
    experience: 90,
    level: 3,
    tasks: [],
    tasksComplete: [],
    mobsFarmed: [],
  });

  const updateUserData = (updatedData) => {
    setUserData(updatedData);
  };

  const addExperience = (amount) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      experience: prevUserData.experience + amount,
    }));
  };

  const currentXP = userData.experience;
  const currentLevel = userData.level;

  useEffect(() => {
    checkExperienceAndLevelUp();
  }, [userData.experience, userData.level]);

  const checkExperienceAndLevelUp = () => {
    const { experience, level } = userData;

    if (experience >= 100) {
      const levelsToGain = Math.floor(experience / 100);
      setUserData((prevUserData) => ({
        ...prevUserData,
        level: level + levelsToGain,
        experience: experience % 100,
      }));
    }
  };

  console.log(userData);

  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <h1 className="font-bold text-9xl text-blue-500">HELLO WORLD!</h1>
        <PomodoroTimer userData={userData} updateUserData={updateUserData} addExperience={addExperience} />
      </div>
      <Checklist />
      <XPBar currentXP={currentXP} xpLevel={currentLevel} />
    </main>
  );
}

