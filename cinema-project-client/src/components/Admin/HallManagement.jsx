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
import * as hallService from '../../services/hallService';

const HallManagement = () => {
  const [halls, setHalls] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: ''
  });

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      const data = await hallService.getAll();
      setHalls(data);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  const handleOpen = (hall = null) => {
    if (hall) {
      setSelectedHall(hall);
      setFormData({
        name: hall.name,
        capacity: hall.capacity
      });
    } else {
      setSelectedHall(null);
      setFormData({
        name: '',
        capacity: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedHall(null);
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
      if (selectedHall) {
        await hallService.update(selectedHall.id, formData);
      } else {
        await hallService.create(formData);
      }
      handleClose();
      fetchHalls();
    } catch (error) {
      console.error('Error saving hall:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu salonu silmek istediğinizden emin misiniz?')) {
      try {
        await hallService.deleteHall(id);
        fetchHalls();
      } catch (error) {
        console.error('Error deleting hall:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Salon Yönetimi</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Yeni Salon Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Salon Adı</TableCell>
              <TableCell>Kapasite</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {halls.map((hall) => (
              <TableRow key={hall.id}>
                <TableCell>{hall.name}</TableCell>
                <TableCell>{hall.capacity} kişi</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(hall)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(hall.id)}>
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
          {selectedHall ? 'Salon Düzenle' : 'Yeni Salon Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Salon Adı"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Kapasite"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedHall ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HallManagement; 