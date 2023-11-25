import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import LearnMore from './pages/LearnMore'
import Home from './Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="/LearnMore" element={<LearnMore />} />
      </Routes>
    </Router>
  );
}

export default App;
