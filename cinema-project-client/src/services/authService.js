import axiosInstance from './axiosInstance';
import { jwtDecode } from 'jwt-decode';

const authService = {
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      console.log('Auth service login response:', response.data);
      
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const user = {
        username: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };

      return {
        user,
        token
      };
    } catch (error) {
      console.error('Auth service login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const decodedToken = jwtDecode(token);
      return {
        username: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      };
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },
};

export default authService; 