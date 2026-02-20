import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // Proxied to http://localhost:8000
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
