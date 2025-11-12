import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Busify</h2>
      </div>
      
      <div className="navbar-user">
        <span className="user-name">{user.name || user.email}</span>
        <span className="user-role">{role === 'admin' ? 'Admin' : 'User'}</span>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
