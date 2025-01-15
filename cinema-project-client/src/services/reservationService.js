import axiosInstance from './axiosInstance';

const reservationService = {
  create: async (reservationData) => {
    const response = await axiosInstance.post('/reservations', reservationData);
    return response.data;
  },

  getByUser: async () => {
    const response = await axiosInstance.get('/reservations/user');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/reservations/${id}`);
    return response.data;
  },

  getByScreeningId: async (screeningId) => {
    const response = await axiosInstance.get(`/reservations/screening/${screeningId}`);
    return response.data;
  },

  cancel: async (id) => {
    const response = await axiosInstance.delete(`/reservations/${id}`);
    return response.data;
  }
};

export default reservationService; 