import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000", // replace with your backend base URL
  timeout: 10000,
});

export default axiosInstance;
