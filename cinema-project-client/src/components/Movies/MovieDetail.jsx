import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Alert, CircularProgress, Button, Grid } from '@mui/material';
import * as movieService from '../../services/movieService';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [screenings, setScreenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieAndScreenings = async () => {
      try {
        const [movieData, screeningsData] = await Promise.all([
          movieService.getById(id),
          movieService.getMovieScreenings(id)
        ]);
        console.log('Screenings Data:', screeningsData);
        setMovie(movieData);
        setScreenings(screeningsData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Film detayları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndScreenings();
  }, [id]);

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

  if (!movie) {
    return <Alert severity="info">Film bulunamadı.</Alert>;
  }

  return (
    <Box>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Geri Dön
      </Button>
      <Card>
        <Grid container>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="500"
              image={movie.posterUrl || "https://via.placeholder.com/400x600"}
              alt={movie.name}
              sx={{ objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {movie.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {movie.description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Yönetmen: {movie.director}
              </Typography>
              <Typography variant="body2">
                Süre: {movie.duration} dakika
              </Typography>
              <Typography variant="body2">
                Vizyon Tarihi: {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>

              {screenings && screenings.length > 0 ? (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Seanslar
                  </Typography>
                  <Grid container spacing={2}>
                    {screenings.map((screening) => (
                      <Grid item xs={12} sm={6} md={4} key={screening.id}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="body2">
                              Salon: {screening.hallName || `Salon ${screening.hallId}`}
                            </Typography>
                            <Typography variant="body2">
                              Tarih: {new Date(screening.screeningTime).getFullYear() > 1 
                                ? new Date(screening.screeningTime).toLocaleDateString() 
                                : 'Tarih belirlenmedi'}
                            </Typography>
                            <Typography variant="body2">
                              Saat: {new Date(screening.screeningTime).getFullYear() > 1 
                                ? new Date(screening.screeningTime).toLocaleTimeString() 
                                : 'Saat belirlenmedi'}
                            </Typography>
                            <Typography variant="body2">
                              Fiyat: {screening.price} TL
                            </Typography>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ mt: 1 }}
                              onClick={() => navigate(`/reservations/create/${screening.id}`)}
                            >
                              Bilet Al
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Alert severity="info" sx={{ mt: 4 }}>
                  Bu film için henüz seans bulunmuyor.
                </Alert>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default MovieDetail; 