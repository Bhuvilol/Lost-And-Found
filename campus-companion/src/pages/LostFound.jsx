import React, { useEffect, useState } from 'react';
import LostFoundForm from '../components/LostFoundForm';
import LostFoundList from '../components/LostFoundList';
import { useUser } from '../UserContext';
import { getFirestore, collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import app from '../firebase';

const db = getFirestore(app);

const LostFound = () => {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    let unsub;
    try {
      const q = query(
        collection(db, 'lostfound'),
        where('uid', '==', user.uid),
        orderBy('date', 'desc')
      );
      unsub = onSnapshot(q, (snapshot) => {
        setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }, (err) => {
        setError(err.message);
        setLoading(false);
        console.error('Firestore onSnapshot error:', err);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Firestore query error:', err);
    }
    return unsub;
  }, [user]);

  const handleAddItem = async (item, resetForm) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'lostfound'), {
        description: item.description,
        location: item.location,
        uid: user.uid,
        date: new Date().toISOString(),
      });
      if (resetForm) resetForm();
    } catch (err) {
      setError(err.message);
      console.error('Error adding lost/found item:', err);
    }
  };

  if (!user) return <div>Please log in to use Lost & Found.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Lost & Found</h2>
      <LostFoundForm onAdd={handleAddItem} />
      <LostFoundList items={items} />
    </div>
  );
};

export default LostFound; 