import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import LostFound from './pages/LostFound';
import Login from './pages/Login';
import Header from './components/Header';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <nav className="cc-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/expenses" className={({ isActive }) => isActive ? 'active' : ''}>Expenses</NavLink>
        <NavLink to="/lostfound" className={({ isActive }) => isActive ? 'active' : ''}>Lost & Found</NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
      </nav>
      <div className="cc-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/lostfound" element={<LostFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
