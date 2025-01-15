import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { generateInvoice } from '../../services/invoiceService';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservationDetails } = location.state || {};
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const steps = ['Ödeme Bilgileri', 'Onay', 'Tamamlandı'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sahte ödeme işlemi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setActiveStep(1); // Onay adımına geç
      
      // Onay sonrası
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActiveStep(2); // Tamamlandı adımına geç
      
      // Fatura oluştur ve indir
      generateInvoice(reservationDetails);

      // Ana sayfaya yönlendir
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      setError('Ödeme işlemi sırasında bir hata oluştu.');
      setActiveStep(0);
    } finally {
      setLoading(false);
    }
  };

  if (!reservationDetails) {
    return <Alert severity="error">Rezervasyon bilgileri bulunamadı!</Alert>;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <>
            <Typography variant="h5" gutterBottom align="center">
              Ödeme Bilgileri
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Toplam Tutar: {reservationDetails.totalAmount} TL
              </Typography>
              <Typography variant="body2">
                Seçili Koltuklar: {reservationDetails.selectedSeats.join(', ')}
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kart Numarası"
                    name="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={handleChange}
                    required
                    inputProps={{ maxLength: 16 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kart Üzerindeki İsim"
                    name="cardHolder"
                    value={cardInfo.cardHolder}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Son Kullanma Tarihi"
                    name="expiryDate"
                    value={cardInfo.expiryDate}
                    onChange={handleChange}
                    required
                    placeholder="MM/YY"
                    inputProps={{ maxLength: 5 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={cardInfo.cvv}
                    onChange={handleChange}
                    required
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <CreditCardIcon />}
                  >
                    {loading ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </>
        )}

        {activeStep === 1 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Ödemeniz İşleniyor...
            </Typography>
          </Box>
        )}

        {activeStep === 2 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Ödeme Başarıyla Tamamlandı!
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Ana sayfaya yönlendiriliyorsunuz...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentPage; 