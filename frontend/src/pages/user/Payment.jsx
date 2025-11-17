
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './UserPages.css';

const Payment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    paymentMethod: 'card',
  });
  const [payments, setPayments] = useState([]);

  // ✅ Fetch payment history from JSON Server
  const fetchPayments = async () => {
    try {
      const res = await fetch('http://localhost:3001/payments');
      const data = await res.json();
      setPayments(data.reverse()); // latest first
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ✅ Update form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Redirect to Payment Gateway
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount) {
      alert('Please fill all fields before proceeding.');
      return;
    }

    navigate('/user/payment-gateway', { state: { formData } });
  };

  return (
    <div>
      <Navbar role="user" />
      <div className="dashboard-layout">
        <Sidebar role="user" />
        <main className="main-content">
          <div className="page-header">
            <h1>Payment</h1>
            <p>Make a payment and view your history</p>
          </div>

          {/* 💳 Payment Form */}
          <div className="card">
            <h2>Make Payment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI </option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Pay Now
              </button>
            </form>
          </div>

          {/* 🧾 Payment History */}
          <div className="card payment-history">
            <h2>Payment History</h2>
            {payments.length === 0 ? (
              <p>No payment records found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.userName || payment.name || '—'}</td>
                      <td>{payment.date}</td>
                      <td>₹{payment.amount}</td>
                      <td>{payment.method}</td>
                      <td>
                        <span
                          style={{
                            color:
                              payment.status === 'completed'
                                ? 'var(--success)'
                                : 'var(--warning)',
                            fontWeight: '500',
                            textTransform: 'capitalize',
                          }}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payment;
