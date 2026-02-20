import axiosInstance from './axiosInstance';

export const sendChatMessage = async (message) => {
    // Using the existing GET /test-llm endpoint for demonstration
    const response = await axiosInstance.get('/test-llm');
    return response.data;
};
