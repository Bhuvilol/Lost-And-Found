import React, { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseChart from '../components/ExpenseChart';
import { useUser } from '../UserContext';
import { getFirestore, collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import app from '../firebase';

const db = getFirestore(app);

const Expenses = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Current user:', user);
    if (!user) return;
    let unsub;
    try {
      const q = query(
        collection(db, 'expenses'),
        where('uid', '==', user.uid),
        orderBy('date', 'desc')
      );
      unsub = onSnapshot(q, (snapshot) => {
        setExpenses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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

  const handleAddExpense = async (expense) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'expenses'), {
        ...expense,
        uid: user.uid,
        date: new Date().toISOString(),
      });
    } catch (err) {
      setError(err.message);
      console.error('Error adding expense:', err);
    }
  };

  if (!user) return <div>Please log in to track your expenses.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Expense Tracker</h2>
      <ExpenseForm onAdd={handleAddExpense} />
      <ExpenseList expenses={expenses} />
      <ExpenseChart expenses={expenses} />
    </div>
  );
};

export default Expenses; 