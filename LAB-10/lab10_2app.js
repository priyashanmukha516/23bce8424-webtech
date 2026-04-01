import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    if (!inputText.trim()) return;
    const newItem = {
      id: Date.now(),
      text: inputText.trim(),
    };
    setItems((prev) => [...prev, newItem]);
    setInputText("");
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <h1>Exercise 2 – Dynamic List</h1>

      <div className="form-group">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter item"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="item-list">
        {items.length === 0 ? (
          <li className="empty">No items yet.</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="list-item">
              {item.text}
              <button
                onClick={() => handleRemove(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;