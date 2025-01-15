import axiosInstance from './axiosInstance';

export const getAll = async () => {
  const response = await axiosInstance.get('/halls');
  return response.data;
};

export const getById = async (id) => {
  const response = await axiosInstance.get(`/halls/${id}`);
  return response.data;
};

export const create = async (hallData) => {
  const response = await axiosInstance.post('/halls', hallData);
  return response.data;
};

export const update = async (id, hallData) => {
  try {
    const response = await axiosInstance.put(`/halls/${id}`, {
      name: hallData.name,
      capacity: parseInt(hallData.capacity)
    });
    return response.data;
  } catch (error) {
    console.error('Error updating hall:', error);
    throw error;
  }
};

export const deleteHall = async (id) => {
  await axiosInstance.delete(`/halls/${id}`);
}; 