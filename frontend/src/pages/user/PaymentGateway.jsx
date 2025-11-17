
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentGateway.css";

const PaymentGateway = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // simulate processing delay
    setTimeout(async () => {
      setIsProcessing(false);
      setIsPaid(true);

      // save payment to json server
      await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(16),
          userName: state?.formData.name,
          date: new Date().toLocaleString(),
          amount: state?.formData.amount,
          method: state?.formData.paymentMethod,
          status: "completed",
        }),
      });

      // redirect back to Payment page
      setTimeout(() => navigate("/user/payment"), 2000);
    }, 2000);
  };

  return (
    <div className="gateway-page">
      {!isPaid ? (
        <div className="payment-card">
          <h1>Secure Payment</h1>
          <p className="user-name">Name: {state?.formData.name}</p>
          <p className="amount">Amount: ₹{state?.formData.amount}</p>
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
          <p>Thank you, {state?.formData.name}.</p>
          <p>Your payment has been recorded.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
