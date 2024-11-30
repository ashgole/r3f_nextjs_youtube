'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage = { role: 'assistant', content: data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error communicating with API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Chat with AI</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '5px 0' }}>
            <b>{msg.role === 'user' ? 'You:' : 'AI:'}</b> {msg.content}
          </div>
        ))}
        {loading && <div>AI is typing...</div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '75%', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: '10px 20px' }}>
        Send
      </button>
    </div>
  );
}
