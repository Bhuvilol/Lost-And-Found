import React from 'react';

const LostFoundList = ({ items }) => (
  <div>
    <h3>Lost/Found Items</h3>
    <ul>
      {items.length === 0 && <li>No items reported yet.</li>}
      {items.map((item, idx) => (
        <li key={idx}>
          {item.imageUrl && <img src={item.imageUrl} alt="item" width={40} style={{ verticalAlign: 'middle', marginRight: 8, borderRadius: 4 }} />}
          <strong>{item.description}</strong> at <em>{item.location}</em> <span>({new Date(item.date).toLocaleDateString()})</span>
        </li>
      ))}
    </ul>
  </div>
);

export default LostFoundList; 