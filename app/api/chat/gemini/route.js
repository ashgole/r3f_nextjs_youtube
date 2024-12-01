import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI);

export async function GET(req) {
  return NextResponse.json({
    name: "ashish"
  })
}
export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get the Gemini model (gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate the response from Gemini
    const result = await model.generateContent(message);

    // Get the content from the response and send it back
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Gemini' }, { status: 500 });
  }
}
