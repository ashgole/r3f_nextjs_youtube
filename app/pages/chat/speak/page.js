'use client';

import { sendMessageM } from '@/app/utils/api';
import { useState } from 'react';

const SpeakPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const speakText = (text) => {
    // Use the SpeechSynthesis API to convert text to speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set the language for the speech
    utterance.pitch = 1; // Optional: Set pitch (1 is the default)
    utterance.rate = 1; // Optional: Set rate of speech (1 is normal speed)

    // Speak the text
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendMessageM(input);
      const data = await response.json();

      if (response.ok) {
        const aiMessage = { role: 'assistant', content: data.reply };
        setMessages((prev) => [...prev, aiMessage]);

        // Speak the AI's response aloud
        speakText(data.reply);  // Speak the AI's reply
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
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>
      <div className="border border-gray-300 p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <b>{msg.role === 'user' ? 'You:' : 'AI:'}</b> {msg.content}
          </div>
        ))}
        {loading && <div>AI is typing...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="text-black border-2 border-gray-300 rounded-md p-2 w-3/4 mr-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
export default SpeakPage
