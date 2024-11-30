import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add to .env.local
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET, // Add to .env.local
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount } = body; // Amount in INR (e.g., 500 for ₹500)

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // Convert to paise (smallest currency unit)
      currency: 'INR',
      receipt: `receipt_${Math.random()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
