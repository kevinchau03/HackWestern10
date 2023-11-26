import React, { useState } from 'react';
import PomodoroTimer from './components/Pomodoro'

export default function Main() {
    const [userData, setUserData] = useState({
        id: 1,
        name: "John Doe",
        experience: 0,
        level: 1,
        tasks: [],
        tasksComplete: [],
        mobsFarmed: [],
      });
    
      const updateUserData = (updatedData) => {
        setUserData(updatedData);
      };
      
      console.log(userData);
      
  return (
    <div className="h-screen flex justify-center items-center">
        <h1 className="font-impact text-9xl text-blue-500">HELLO WORLD!</h1>
        <PomodoroTimer userData={userData} updateUserData={updateUserData} />
    </div>
  )
}
