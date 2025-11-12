import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { mockPayments, mockUsers } from '../../mockData';
import './AdminPages.css';

const Payments = () => {
  const getUserName = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  const totalRevenue = mockPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = mockPayments.filter(p => p.status === 'completed').length;
  const pendingPayments = mockPayments.filter(p => p.status === 'pending').length;

  return (
    <div>
      <Navbar role="admin" />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="main-content">
          <div className="page-header">
            <h1>Payment Management</h1>
            <p>Track all payment transactions</p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#E8F5E9'}}>💰</div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <p className="stat-number">₹{totalRevenue}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#E3F2FD'}}>✅</div>
              <div className="stat-content">
                <h3>Completed</h3>
                <p className="stat-number">{completedPayments}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#FFF3E0'}}>⏳</div>
              <div className="stat-content">
                <h3>Pending</h3>
                <p className="stat-number">{pendingPayments}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2>All Payments</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map(payment => (
                  <tr key={payment.id}>
                    <td>{getUserName(payment.userId)}</td>
                    <td>{payment.type}</td>
                    <td>₹{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>
                      <span style={{
                        color: payment.status === 'completed' ? 'var(--success)' : 'var(--warning)',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payments;
