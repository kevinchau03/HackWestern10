import PomodoroTimer from "./components/Pomodoro";

function App() {
  const currentXP = 250; // Replace with your actual XP
  const maxXP = 500; // Replace with your maximum XP
  const xpLevel = 1;

  return (
    <div>
      <h1 className="font-bold text-9xl text-blue-500">HELLO WORLD!</h1>
      <PomodoroTimer />
    </div>
  );
}

export default App;
