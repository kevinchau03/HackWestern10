import React from 'react'
import PomodoroTimer from './components/Pomodoro'

export default function Main() {
  return (
    <div className="h-screen flex justify-center items-center">
        <h1 className="font-bold text-9xl text-blue-500">HELLO WORLD!</h1>
        <PomodoroTimer />
    </div>
  )
}
