import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MockPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  const handleConfirm = async () => {
    const newPayment = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      amount: formData.amount,
      paymentMethod: formData.paymentMethod,
      status: "completed",
    };

    try {
      await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayment),
      });
      alert("Payment successful!");
      navigate("/user/payment");
    } catch (err) {
      console.error("Error adding payment:", err);
    }
  };

  if (!formData)
    return (
      <div style={{ padding: 20 }}>
        <h2>No payment data found</h2>
        <button onClick={() => navigate("/user/payment")}>Go Back</button>
      </div>
    );

  return (
    <div className="mock-payment-page" style={{ padding: 40, textAlign: "center" }}>
      <h1>Mock Razorpay</h1>
      <p>Simulating a secure payment...</p>
      <div style={{ margin: "20px auto", border: "1px solid #ccc", width: 300, padding: 20 }}>
        <h3>Amount: ₹{formData.amount}</h3>
        <p>Method: {formData.paymentMethod}</p>
      </div>
      <button onClick={handleConfirm} className="btn btn-primary">
        Confirm Payment
      </button>
    </div>
  );
};

export default MockPayment;
