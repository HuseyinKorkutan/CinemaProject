import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Alert, 
  CircularProgress, 
  Box,
  Container,
  Rating
} from '@mui/material';
import { Link } from 'react-router-dom';
import * as movieService from '../../services/movieService';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getActiveMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Filmler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Vizyondaki Filmler
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}>
              <CardMedia
                component="img"
                height="400"
                image={movie.posterUrl || "https://via.placeholder.com/300x450"}
                alt={movie.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {movie.description?.length > 150 
                    ? `${movie.description.substring(0, 150)}...` 
                    : movie.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Yönetmen: {movie.director}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Süre: {movie.duration} dakika
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Vizyon Tarihi: {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
                {movie.rating && (
                  <Box sx={{ mt: 1 }}>
                    <Rating value={movie.rating} readOnly precision={0.5} />
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  component={Link} 
                  to={`/movies/${movie.id}`}
                  variant="contained"
                  fullWidth
                >
                  Detaylar ve Seanslar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList; 