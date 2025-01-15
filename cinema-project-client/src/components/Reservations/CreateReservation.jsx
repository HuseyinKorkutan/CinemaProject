import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import WeekendIcon from '@mui/icons-material/Weekend';
import * as screeningService from '../../services/screeningService';
import reservationService from '../../services/reservationService';

const CreateReservation = () => {
  const { screeningId } = useParams();
  const navigate = useNavigate();
  const [screening, setScreening] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [reservedSeats, setReservedSeats] = useState(() => new Set());
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: ''
  });

  // Koltuk sayısını screening.hall.capacity'den alacağız
  const [totalSeats, setTotalSeats] = useState(0);
  const seatsPerRow = 8; // Her sıradaki koltuk sayısı sabit kalabilir

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchScreeningAndReservations = async () => {
      try {
        const [screeningData, reservationsData] = await Promise.all([
          screeningService.getById(screeningId),
          reservationService.getByScreeningId(screeningId)
        ]);
        console.log('Screening Data:', screeningData);
        setScreening(screeningData);
        setPrice(parseFloat(screeningData.price));
        if (screeningData.hall && screeningData.hall.capacity) {
          setTotalSeats(screeningData.hall.capacity);
        } else {
          setTotalSeats(40);
        }
        setReservedSeats(new Set(reservationsData.map(r => r.seatNumber)));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchScreeningAndReservations();
  }, [screeningId]);

  const handleSeatClick = (seatNumber) => {
    console.log('Clicking seat:', seatNumber);
    console.log('Current selected seats:', selectedSeats);

    if (!reservedSeats.has(seatNumber)) {
      setSelectedSeats(prevSeats => {
        if (prevSeats.includes(seatNumber)) {
          console.log('Removing seat:', seatNumber);
          const newSeats = prevSeats.filter(seat => seat !== seatNumber);
          console.log('New seats after removal:', newSeats);
          return newSeats;
        }
        console.log('Adding seat:', seatNumber);
        const newSeats = [...prevSeats, seatNumber].sort((a, b) => Number(a) - Number(b));
        console.log('New seats after addition:', newSeats);
        return newSeats;
      });
      
      setUpdateTrigger(prev => prev + 1);
    }
  };

  useEffect(() => {
    console.log('Selected seats updated:', selectedSeats);
  }, [selectedSeats, updateTrigger]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      setError('Lütfen en az bir koltuk seçin.');
      return;
    }

    try {
      await Promise.all(selectedSeats.map(seatNumber => 
        reservationService.create({
          screeningId: parseInt(screeningId),
          seatNumber: seatNumber.toString(),
          customerName: formData.customerName,
          customerPhone: formData.customerPhone
        })
      ));
      
      // Ödeme sayfasına yönlendir
      navigate('/payment', {
        state: {
          reservationDetails: {
            selectedSeats,
            totalAmount: (price * selectedSeats.length).toFixed(2),
            customerName: formData.customerName,
            screeningInfo: {
              movieName: screening.movieName,
              hallName: screening.hallName,
              screeningTime: screening.screeningTime
            }
          }
        }
      });
    } catch (error) {
      setError('Rezervasyon oluşturulurken bir hata oluştu.');
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let row = 0; row < Math.ceil(totalSeats / seatsPerRow); row++) {
      const rowSeats = [];
      for (let col = 0; col < seatsPerRow; col++) {
        const seatNumber = (row * seatsPerRow + col + 1).toString();
        if (parseInt(seatNumber) <= totalSeats) {
          const isReserved = reservedSeats.has(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);
          
          rowSeats.push(
            <Grid item key={seatNumber}>
              <Tooltip title={`Koltuk ${seatNumber}`}>
                <IconButton
                  onClick={() => handleSeatClick(seatNumber)}
                  disabled={isReserved}
                  sx={{
                    color: isReserved ? 'grey.500' : 
                           isSelected ? 'primary.main' : 'action.active',
                    '&:hover': {
                      color: isReserved ? 'grey.500' : 'primary.dark'
                    }
                  }}
                >
                  <Box position="relative">
                    <WeekendIcon fontSize="large" />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: isSelected ? 'white' : 'text.primary',
                        fontSize: '0.7rem'
                      }}
                    >
                      {seatNumber}
                    </Typography>
                  </Box>
                </IconButton>
              </Tooltip>
            </Grid>
          );
        }
      }
      seats.push(
        <Grid container item justifyContent="center" spacing={1} key={row}>
          {rowSeats}
        </Grid>
      );
    }
    return seats;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom align="center">
          Bilet Rezervasyonu
        </Typography>
        {screening && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" align="center">
              Film: {screening.movieName}
            </Typography>
            <Typography variant="body2" align="center">
              Salon: {screening.hallName}
            </Typography>
            <Typography variant="body2" align="center">
              Tarih: {new Date(screening.screeningTime).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" align="center">
              Saat: {new Date(screening.screeningTime).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" align="center" gutterBottom>
              Fiyat: {screening.price} TL
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Koltuk Seçimi
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <Box display="flex" alignItems="center">
                  <WeekendIcon sx={{ color: 'action.active' }} />
                  <Typography variant="caption" sx={{ ml: 1 }}>Boş</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <WeekendIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="caption" sx={{ ml: 1 }}>Seçili</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <WeekendIcon sx={{ color: 'grey.500' }} />
                  <Typography variant="caption" sx={{ ml: 1 }}>Dolu</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Grid container direction="column" spacing={1}>
              {renderSeats()}
            </Grid>
          </Box>
        </Box>

        {selectedSeats.length > 0 && (
          <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }} key={updateTrigger}>
            <Typography variant="body1">
              Seçili Koltuklar: {selectedSeats.join(', ')}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
              Bilet Fiyatı: {price.toFixed(2)} TL
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Toplam Tutar: {(price * selectedSeats.length).toFixed(2)} TL
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
              (Seçili Koltuk Sayısı: {selectedSeats.length})
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ad Soyad"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefon"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={selectedSeats.length === 0}
              >
                {selectedSeats.length} Koltuk İçin Rezervasyon Yap
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateReservation; 