import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Bot } from 'lucide-react';
import { sendChatMessage } from '../../api/aiChatApi';
import '../../styles/chat.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Clinic AI assistant. How can I help you today?", isAi: true }
    ]);
    const [loading, setLoading] = useState(false);
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
            setMessages(prev => [...prev, { text: "Sorry, I encountered an error connecting to the AI.", isAi: true }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container glass-morphism animate-fade-in">
            <div className="chat-header">
                <div className="header-title">
                    <Bot size={22} style={{ color: 'var(--primary)' }} />
                    <span>Clinic AI</span>
                </div>
            </div>

            <div className="chat-messages" ref={scrollRef}>
                {messages.length === 0 ? (
                    <div className="empty-state">
                        <Bot size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                        <h3>How can I help you today?</h3>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <ChatMessage key={idx} message={msg.text} isAi={msg.isAi} />
                    ))
                )}
                {loading && (
                    <div className="chat-message-row ai-row">
                        <div className="chat-message-content">
                            <div className="avatar ai-avatar"><Bot size={20} /></div>
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="chat-input-section">
                <ChatInput onSend={handleSendMessage} disabled={loading} />
            </div>
        </div>
    );
};

export default ChatWindow;
