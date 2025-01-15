import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const { user, logout } = useAuth();

  const renderAuthButtons = () => {
    if (user) {
      return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} key="auth-user">
          {user.role === 'Admin' && (
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/admin"
              key="admin-button"
            >
              Admin Paneli
            </Button>
          )}
          <Typography variant="subtitle1" key="username">
            {user.username}
          </Typography>
          <Button 
            color="inherit" 
            onClick={logout}
            key="logout-button"
          >
            Çıkış Yap
          </Button>
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', gap: 1 }} key="auth-guest">
        <Button 
          color="inherit" 
          component={RouterLink} 
          to="/login"
          key="login-button"
        >
          Giriş Yap
        </Button>
        <Button 
          color="inherit" 
          component={RouterLink} 
          to="/register"
          key="register-button"
        >
          Kayıt Ol
        </Button>
      </Box>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Cinema
        </Typography>
        {renderAuthButtons()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 