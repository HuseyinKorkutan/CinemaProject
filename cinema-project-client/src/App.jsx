import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import { Container } from '@mui/material';
import MovieList from './components/Movies/MovieList';
import MovieDetail from './components/Movies/MovieDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthProvider } from './contexts/AuthContext';
import CreateReservation from './components/Reservations/CreateReservation';
import PaymentPage from './components/Payment/PaymentPage';
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Container sx={{ mt: 4, flex: 1 }}>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reservations/create/:screeningId" element={<CreateReservation />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 