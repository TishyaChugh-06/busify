// import React, { useState } from 'react';
// import Navbar from '../../components/Navbar';
// import Sidebar from '../../components/Sidebar';
// import { mockPayments } from '../../mockData';
// import './UserPages.css';

// const Payment = () => {
//   const [formData, setFormData] = useState({
//     passType: 'monthly',
//     amount: 500,
//     paymentMethod: 'card'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Update amount based on pass type
//     if (name === 'passType') {
//       const amounts = {
//         'weekly': 300,
//         'monthly': 500,
//         'semester': 1000
//       };
//       setFormData({ ...formData, passType: value, amount: amounts[value] });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Payment processed successfully!');
//   };

//   return (
//     <div>
//       <Navbar role="user" />
//       <div className="dashboard-layout">
//         <Sidebar role="user" />
//         <main className="main-content">
//           <div className="page-header">
//             <h1>Payment</h1>
//             <p>Manage your bus pass payments</p>
//           </div>
          
//           <div className="card">
//             <h2>Make Payment</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Pass Type</label>
//                 <select name="passType" value={formData.passType} onChange={handleChange}>
//                   <option value="weekly">Weekly Pass - ₹300</option>
//                   <option value="monthly">Monthly Pass - ₹500</option>
//                   <option value="semester">Semester Pass - ₹1000</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label>Amount</label>
//                 <input type="text" value={`₹${formData.amount}`} readOnly />
//               </div>
              
//               <div className="form-group">
//                 <label>Payment Method</label>
//                 <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
//                   <option value="card">Credit/Debit Card</option>
//                   <option value="upi">UPI</option>
//                   <option value="netbanking">Net Banking</option>
//                 </select>
//               </div>
              
//               <button type="submit" className="btn btn-primary">
//                 Pay Now
//               </button>
//             </form>
//           </div>
          
//           <div className="card payment-history">
//             <h2>Payment History</h2>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Type</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {mockPayments.map(payment => (
//                   <tr key={payment.id}>
//                     <td>{payment.date}</td>
//                     <td>{payment.type}</td>
//                     <td>₹{payment.amount}</td>
//                     <td>
//                       <span style={{
//                         color: payment.status === 'completed' ? 'var(--success)' : 'var(--warning)',
//                         fontWeight: '500',
//                         textTransform: 'capitalize'
//                       }}>
//                         {payment.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import './UserPages.css';

const Payment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'card',
  });
  const [payments, setPayments] = useState([]);

  // Fetch payment history from JSON server
  useEffect(() => {
    fetch('http://localhost:3001/payments')
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error('Error fetching payments:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) {
      alert('Please enter an amount!');
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

          {/* Payment Form */}
          <div className="card">
            <h2>Make Payment</h2>
            <form onSubmit={handleSubmit}>
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
                  <option value="upi">UPI (GPay / PhonePe)</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Pay Now
              </button>
            </form>
          </div>

          {/* Payment History Table */}
          <div className="card payment-history">
            <h2>Payment History</h2>
            {payments.length === 0 ? (
              <p>No payment records found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
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
