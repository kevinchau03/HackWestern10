import React, { useState } from 'react';
import PomodoroTimer from './components/Pomodoro'
import XPBar from './components/XPBar'

export default function Main() {
    const [userData, setUserData] = useState({
        id: 1,
        name: "John Doe",
        experience: 50,
        level: 3,
        tasks: [],
        tasksComplete: [],
        mobsFarmed: [],
      });
    
      const updateUserData = (updatedData) => {
        setUserData(updatedData);
      };
      
      console.log(userData);
      const currentXP = userData.experience;
      const currentLevel = userData.level;

  return (
    <main>
        <div className="h-screen flex justify-center items-center">
            <h1 className="font-bold text-9xl text-blue-500">HELLO WORLD!</h1>
            <PomodoroTimer userData={userData} updateUserData={updateUserData} />
        </div>
        <XPBar currentXP={currentXP} xpLevel={currentLevel} />
    </main>
  )
}
