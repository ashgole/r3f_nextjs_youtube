 import { OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch data from OpenAI' }, { status: 500 });
  }
}

export async function GET(req) {
  return NextResponse.json({ message: 'Hello, World!' });
}
