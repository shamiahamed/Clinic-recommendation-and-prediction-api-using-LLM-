import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Bot, X, Minus, Maximize2 } from 'lucide-react';
import { sendChatMessage } from '../../api/aiChatApi';

const ChatWindow = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Clinic AI assistant. How can I help you today?", isAi: true }
    ]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (text) => {
        setMessages(prev => [...prev, { text, isAi: false }]);
        setLoading(true);

        try {
            const response = await sendChatMessage(text);
            setMessages(prev => [...prev, { text: response, isAi: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again.", isAi: true }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return (
        <button className="chat-trigger glass-morphism" onClick={() => setIsOpen(true)}>
            <Bot size={24} color="white" />
            <style>{`
        .chat-trigger {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: var(--primary);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          transition: transform 0.2s;
        }
        .chat-trigger:hover {
          transform: scale(1.1);
        }
      `}</style>
        </button>
    );

    return (
        <div className={`chat-container glass-morphism ${isMinimized ? 'minimized' : ''}`}>
            <div className="chat-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bot size={20} />
                    <span style={{ fontWeight: 600 }}>Clinic AI Chat</span>
                </div>
                <div className="header-actions">
                    <button onClick={() => setIsMinimized(!isMinimized)}>
                        {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
                    </button>
                    <button onClick={() => setIsOpen(false)}><X size={16} /></button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    <div className="chat-messages" ref={scrollRef}>
                        {messages.map((msg, idx) => (
                            <ChatMessage key={idx} message={msg.text} isAi={msg.isAi} />
                        ))}
                        {loading && <div className="message ai-message italic text-xs">AI is thinking...</div>}
                    </div>
                    <ChatInput onSend={handleSendMessage} disabled={loading} />
                </>
            )}

            <style>{`
        .header-actions {
          display: flex;
          gap: 0.5rem;
        }
        .header-actions button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .header-actions button:hover {
          opacity: 1;
        }
        .minimized {
          height: auto !important;
        }
        .italic { font-style: italic; }
        .text-xs { font-size: 0.75rem; }
      `}</style>
        </div>
    );
};

export default ChatWindow;
