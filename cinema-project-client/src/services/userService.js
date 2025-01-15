import axiosInstance from './axiosInstance';

export const getAll = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const getById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const update = async (id, userData) => {
  const response = await axiosInstance.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  await axiosInstance.delete(`/users/${id}`);
}; 