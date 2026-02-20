import React from 'react';

const ChatMessage = ({ message, isAi }) => {
    return (
        <div className={`message ${isAi ? 'ai-message' : 'user-message'}`}>
            {message}
        </div>
    );
};

export default ChatMessage;
