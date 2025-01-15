import axiosInstance from './axiosInstance';

export const getAll = async () => {
  const response = await axiosInstance.get('/screenings');
  return response.data;
};

export const getById = async (id) => {
  const response = await axiosInstance.get(`/screenings/${id}`);
  return response.data;
};

export const create = async (screeningData) => {
  const response = await axiosInstance.post('/screenings', screeningData);
  return response.data;
};

export const update = async (id, screeningData) => {
  const response = await axiosInstance.put(`/screenings/${id}`, screeningData);
  return response.data;
};

export const deleteScreening = async (id) => {
  await axiosInstance.delete(`/screenings/${id}`);
}; 