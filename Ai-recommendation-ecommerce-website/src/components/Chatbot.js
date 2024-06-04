import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSend = async () => {
        const { data } = await axios.post('/api/chatbot', { message });
        setResponse(data.response);
    };

    return (
        <div>
            <h2>Product Recommendation Chatbot</h2>
            <div>
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Ask me for product recommendations..." 
                />
                <button onClick={handleSend}>Send</button>
            </div>
            <div>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default Chatbot;
