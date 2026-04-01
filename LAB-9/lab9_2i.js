import React from 'react';
import StudentCard from './StudentCard';
import './App.css';

function App() {
  const students = [
    { name: 'Alice Johnson', department: 'CSE', marks: 92 },
    { name: 'Bob Smith', department: 'ECE', marks: 87 },
    { name: 'Carol Lee', department: 'CSE', marks: 95 }
  ];

  return (
    <div className="App">
      <h2>Student Cards</h2>
      {students.map((student, index) => (
        <StudentCard
          key={index}
          name={student.name}
          department={student.department}
          marks={student.marks}
        />
      ))}
    </div>
  );
}

export default App;