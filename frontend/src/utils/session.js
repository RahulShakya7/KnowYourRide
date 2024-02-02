// Import necessary libraries
import { message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

// Add request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the JWT token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;

    if (status === 401) {
      // Token expired or unauthorized, perform logout and redirect
      message.error('Your session has expired. Please log in again.');
      logoutAndRedirect();
    }

    return Promise.reject(error);
  }
);

// Function to perform logout and redirect
const logoutAndRedirect = () => {
  // Clear local storage and perform other logout-related tasks
  localStorage.removeItem('token');
  // Redirect to the login page
  history.push('/login');  // Replace with the path to your login page
};

// Use React Router's useHistory hook to manage navigation
const history = useHistory();

export default api;
