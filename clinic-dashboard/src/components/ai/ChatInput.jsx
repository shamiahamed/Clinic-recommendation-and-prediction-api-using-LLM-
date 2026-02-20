import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <div className="chat-input-area">
            <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={disabled}
            />
            <button
                className="send-btn"
                onClick={handleSend}
                disabled={disabled || !input.trim()}
            >
                <Send size={18} />
            </button>
        </div>
    );
};

export default ChatInput;
