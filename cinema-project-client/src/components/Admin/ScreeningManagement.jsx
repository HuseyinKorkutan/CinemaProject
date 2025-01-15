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
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import * as screeningService from '../../services/screeningService';
import * as movieService from '../../services/movieService';
import * as hallService from '../../services/hallService';

const ScreeningManagement = () => {
  const [screenings, setScreenings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [formData, setFormData] = useState({
    movieId: '',
    hallId: '',
    screeningTime: '',
    price: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [screeningsData, moviesData, hallsData] = await Promise.all([
        screeningService.getAll(),
        movieService.getAll(),
        hallService.getAll()
      ]);
      setScreenings(screeningsData);
      setMovies(moviesData);
      setHalls(hallsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpen = (screening = null) => {
    if (screening) {
      setSelectedScreening(screening);
      setFormData({
        movieId: screening.movieId,
        hallId: screening.hallId,
        screeningTime: screening.screeningTime.slice(0, 16), // Format datetime-local
        price: screening.price
      });
    } else {
      setSelectedScreening(null);
      setFormData({
        movieId: '',
        hallId: '',
        screeningTime: '',
        price: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedScreening(null);
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
      if (selectedScreening) {
        await screeningService.update(selectedScreening.id, formData);
      } else {
        await screeningService.create(formData);
      }
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error saving screening:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu seansı silmek istediğinizden emin misiniz?')) {
      try {
        await screeningService.deleteScreening(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting screening:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Seans Yönetimi</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Yeni Seans Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Film</TableCell>
              <TableCell>Salon</TableCell>
              <TableCell>Tarih/Saat</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {screenings.map((screening) => (
              <TableRow key={screening.id}>
                <TableCell>{screening.movieName}</TableCell>
                <TableCell>{screening.hallName}</TableCell>
                <TableCell>
                  {new Date(screening.screeningTime).toLocaleString()}
                </TableCell>
                <TableCell>{screening.price} TL</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(screening)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(screening.id)}>
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
          {selectedScreening ? 'Seans Düzenle' : 'Yeni Seans Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Film</InputLabel>
              <Select
                name="movieId"
                value={formData.movieId}
                onChange={handleChange}
                label="Film"
              >
                {movies.map((movie) => (
                  <MenuItem key={movie.id} value={movie.id}>
                    {movie.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Salon</InputLabel>
              <Select
                name="hallId"
                value={formData.hallId}
                onChange={handleChange}
                label="Salon"
              >
                {halls.map((hall) => (
                  <MenuItem key={hall.id} value={hall.id}>
                    {hall.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Tarih/Saat"
              name="screeningTime"
              type="datetime-local"
              value={formData.screeningTime}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Fiyat"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedScreening ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScreeningManagement; 