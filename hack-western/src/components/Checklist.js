import React, { useState } from 'react';

const Checklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', completed: false },
    { id: 2, text: 'Item 2', completed: false },
    { id: 3, text: 'Item 3', completed: false },
  ]);

  const handleToggle = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className = "flex justify-center items-center h-screen">
      <h2>Quest Log</h2>
      <ul className="list-none p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className={`flex items-center ${item.completed ? 'completed' : ''}`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id)}
              className="mr-2" // Adjust margin as needed
            />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
