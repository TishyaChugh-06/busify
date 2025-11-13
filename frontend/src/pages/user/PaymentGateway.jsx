import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentGateway.css';

const PaymentGateway = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // simulate delay
    setTimeout(async () => {
      setIsProcessing(false);
      setIsPaid(true);

      // save payment to json server
      await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: new Date().toLocaleString(),
          amount: state?.formData.amount,
          method: state?.formData.paymentMethod,
          status: 'completed',
        }),
      });

      // redirect after success
      setTimeout(() => navigate('/user/payment'), 2000);
    }, 2000);
  };

  return (
    <div className="gateway-page">
      {!isPaid ? (
        <div className="payment-card">
          <h1>Secure Payment</h1>
          <p className="amount">₹{state?.formData.amount}</p>
          <p className="method">Paying via: {state?.formData.paymentMethod}</p>

          {!isProcessing ? (
            <button className="pay-btn" onClick={handlePayment}>
              Pay Now
            </button>
          ) : (
            <div className="loader"></div>
          )}

          <p className="secure-text">🔒 Transactions are encrypted and secure</p>
        </div>
      ) : (
        <div className="success-card">
          <div className="tick">✅</div>
          <h1>Payment Successful!</h1>
          <p>Your payment was processed securely.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
