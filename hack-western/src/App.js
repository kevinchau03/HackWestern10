import Home from "./Home"
import Main from "./Main"

function App() {
  const initialUserData = {
    id: 1,
    name: "John Doe",
    experience: 0,
    level: 1,
    tasks: [],
    tasksComplete: [],
    mobsFarmed: []
  };

  console.log(initialUserData)
  return (
    <div>
      <Home />
      <Main />
      console.log()
    </div>
  );
}

export default App;
