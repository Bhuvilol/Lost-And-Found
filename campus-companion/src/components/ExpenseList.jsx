import React from 'react';

const ExpenseList = ({ expenses }) => (
  <div>
    <h3>Past Entries</h3>
    <ul>
      {expenses.length === 0 && <li>No expenses yet.</li>}
      {expenses.map((exp, idx) => (
        <li key={idx}>
          <strong>{exp.category}</strong>: ${exp.amount} ({exp.notes}) <em>{new Date(exp.date).toLocaleDateString()}</em>
        </li>
      ))}
    </ul>
  </div>
);

export default ExpenseList; 