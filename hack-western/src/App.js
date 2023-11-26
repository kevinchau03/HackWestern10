// App.js
import React, { useState, useEffect } from 'react';
import XPBar from './components/XPBar';
import Home from './Home';
import Main from './Main';
import Checklist from './components/Checklist';

function App() {

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
    </div>
  );
}

export default App;
