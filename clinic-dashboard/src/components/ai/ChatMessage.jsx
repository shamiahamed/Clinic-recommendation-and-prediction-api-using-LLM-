import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isAi }) => {
    return (
        <div className={`chat-message-row ${isAi ? 'ai-row' : 'user-row'}`}>
            <div className="chat-message-content">
                <div className={`avatar ${isAi ? 'ai-avatar' : 'user-avatar'}`}>
                    {isAi ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-body">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                    >
                        {message}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
