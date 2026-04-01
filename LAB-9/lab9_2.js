import React from 'react';

function StudentCard({ name, department, marks }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Department: {department}</p>
      <p>Marks: {marks}</p>
    </div>
  );
}

export default StudentCard;