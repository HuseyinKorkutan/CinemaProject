import axiosInstance from './axiosInstance';

export const getAll = async () => {
  const response = await axiosInstance.get('/movies');
  return response.data;
};

export const getActiveMovies = async () => {
  const response = await axiosInstance.get('/movies/active');
  return response.data;
};

export const getById = async (id) => {
  const response = await axiosInstance.get(`/movies/${id}`);
  return response.data;
};

export const getMovieScreenings = async (movieId) => {
  const response = await axiosInstance.get(`/screenings/movie/${movieId}`);
  return response.data;
};

export const create = async (movieData) => {
  try {
    const response = await axiosInstance.post('/movies', {
      ...movieData,
      duration: parseInt(movieData.duration),
      releaseDate: new Date(movieData.releaseDate).toISOString(),
      isActive: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
};

export const update = async (id, movieData) => {
  const response = await axiosInstance.put(`/movies/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  await axiosInstance.delete(`/movies/${id}`);
}; 