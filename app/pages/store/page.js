'use client';

import Script from 'next/script';
import { useState } from 'react';
export default function PaymentPage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      // Create order on the server
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const order = await response.json();
      if (!response.ok) {
        console.error('Error creating order:', order.error);
        alert('Error creating order');
        return;
      }

      // Open Razorpay payment modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add to .env.local
        amount: order.amount,
        currency: order.currency,
        name: 'ASHABB',
        description: 'Test Transaction',
        order_id: order.id,
        handler: function (response) {
          alert(`Payment successful: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error in payment:', error);
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
       <Script
        src="https://checkout.razorpay.com/v1/checkout.js"/>
      <h1 className="text-2xl font-bold mb-4">Razorpay Payment</h1>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}
