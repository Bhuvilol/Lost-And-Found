import React, { useState } from 'react';

const LostFoundForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const resetForm = () => {
    setDescription('');
    setLocation('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !location) return;
    onAdd({ description, location }, resetForm);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300 }}>
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
      <button type="submit">Report Item</button>
    </form>
  );
};

export default LostFoundForm; 