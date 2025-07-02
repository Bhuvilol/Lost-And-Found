import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../firebase';
import { useUser } from '../UserContext';

const AuthForm = () => {
  const { user, loading } = useUser();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPending(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
    setPending(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <div>Loading...</div>;
  if (user) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Welcome, <b>{user.email}</b>!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '0 auto' }}>
      <h3>{isRegister ? 'Register' : 'Login'}</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" disabled={pending}>{pending ? 'Please wait...' : (isRegister ? 'Register' : 'Login')}</button>
      <div style={{ marginTop: 8 }}>
        <button type="button" onClick={() => setIsRegister(r => !r)} style={{ background: 'none', color: '#2563eb', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm; 