// App.js
import React, { useState, useEffect } from 'react';
import XPBar from './components/XPBar';
import Home from './Home';
import Main from './Main';
import Checklist from './components/Checklist';

function App() {
  const currentXP = 250; // Replace with your actual XP
  const maxXP = 500; // Replace with your maximum XP
  const xpLevel = 1;

  const [showXPBar, setShowXPBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 400;

      if (window.scrollY > scrollThreshold) {
        setShowXPBar(true);
      } else {
        setShowXPBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Home />
      <Main />
      <Checklist />
      {showXPBar && <XPBar currentXP={currentXP} maxXP={maxXP} xpLevel={xpLevel} />}
    </div>
  );
}

export default App;
