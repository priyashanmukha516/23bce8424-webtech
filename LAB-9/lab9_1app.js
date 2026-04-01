import React from 'react';
import './App.css';

function StudentProfile() {
  const student = {
    name: 'TIRUVADRI NATARAJA SHANMUKHA PRIYA',
    department: 'Computer Science Engineering',
    year: 2,
    section: 'B'
  };

  return (
    <div className="profile">
      <h1>{student.name}</h1>
      <p>Department: {student.department}</p>
      <p>Year: {student.year}</p>
      <p>Section: {student.section}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>Student Profile</h2>
      <StudentProfile />
    </div>
  );
}

export default App;