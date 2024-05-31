import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);

    try {
      const { data } = await axios.post('/api/chatbot/message', { message: input });
      setMessages([...messages, newMessage, { role: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type your message..." 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
