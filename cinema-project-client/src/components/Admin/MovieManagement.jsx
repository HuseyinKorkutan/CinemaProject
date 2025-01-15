import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import * as movieService from '../../services/movieService';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    director: '',
    releaseDate: new Date().toISOString().split('T')[0],
    posterUrl: '',
    isActive: true
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await movieService.getAll();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleOpen = (movie = null) => {
    if (movie) {
      setSelectedMovie(movie);
      setFormData({
        name: movie.name,
        description: movie.description,
        duration: movie.duration,
        director: movie.director,
        releaseDate: movie.releaseDate,
        posterUrl: movie.posterUrl,
        isActive: movie.isActive
      });
    } else {
      setSelectedMovie(null);
      setFormData({
        name: '',
        description: '',
        duration: '',
        director: '',
        releaseDate: new Date().toISOString().split('T')[0],
        posterUrl: '',
        isActive: true
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMovie) {
        await movieService.update(selectedMovie.id, formData);
      } else {
        await movieService.create(formData);
      }
      handleClose();
      fetchMovies();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu filmi silmek istediğinizden emin misiniz?')) {
      try {
        await movieService.deleteMovie(id);
        fetchMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Film Yönetimi</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Yeni Film Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Film Adı</TableCell>
              <TableCell>Süre</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.name}</TableCell>
                <TableCell>{movie.duration} dakika</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(movie)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(movie.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedMovie ? 'Film Düzenle' : 'Yeni Film Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Film Adı"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Açıklama"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Süre (dakika)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Yönetmen"
              name="director"
              value={formData.director}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Vizyon Tarihi"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              fullWidth
              label="Afiş URL"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedMovie ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovieManagement; 