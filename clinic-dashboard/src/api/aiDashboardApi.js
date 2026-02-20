import axiosInstance from './axiosInstance';

export const getFinancialRisk = async (clinicId) => {
    const response = await axiosInstance.get(`/financial-risk/${clinicId}`);
    return response.data;
};

export const getAiRecommendations = async (clinicId) => {
    const response = await axiosInstance.get(`/ai-recommendation/${clinicId}`);
    return response.data;
};
