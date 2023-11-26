// App.js
import React from 'react';
import PomodoroTimer from "./components/Pomodoro";
import XPBar from "./components/XPBar"
import './App.css';

function App() {
  const currentXP = 250; // Replace with your actual XP
  const maxXP = 500; // Replace with your maximum XP
  const xpLevel = 1;

  return (
    <div className="app-container">
      <h1 className="font-impact text-9xl">LEVEL UP</h1>
      <p className="text-4xl"></p>
      <PomodoroTimer />
      
      <div className="flex flex-col items-center justify-center h-screen">
        <XPBar currentXP={currentXP} maxXP={maxXP} xpLevel={xpLevel} />
      </div>
    </div>
  );
}

export default App;
