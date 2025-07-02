import React from 'react';

const dummyExpenses = [
  { amount: 12, category: 'food', notes: 'Lunch', date: new Date().toISOString() },
  { amount: 5, category: 'travel', notes: 'Bus', date: new Date().toISOString() },
];

const dummyLostFound = [
  { description: 'Blue water bottle', location: 'Library', date: new Date().toISOString() },
  { description: 'Black backpack', location: 'Cafeteria', date: new Date().toISOString() },
];

const Home = () => (
  <div>
    <h2>Dashboard</h2>
    <section style={{ marginBottom: 24 }}>
      <h3>Today's Expenses</h3>
      <ul>
        {dummyExpenses.map((exp, idx) => (
          <li key={idx}>
            <strong>{exp.category}</strong>: ${exp.amount} ({exp.notes})
          </li>
        ))}
      </ul>
    </section>
    <section>
      <h3>Recent Lost/Found Posts</h3>
      <ul>
        {dummyLostFound.map((item, idx) => (
          <li key={idx}>
            <strong>{item.description}</strong> at <em>{item.location}</em>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default Home; 