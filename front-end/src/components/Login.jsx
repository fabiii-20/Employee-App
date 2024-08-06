import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });
      setLoading(false);
      const { success, role, message, token } = response.data;
      if (success) {
        // Store token in local storage
        localStorage.setItem('token', token);
        // Call onLogin function from props
        onLogin();
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'employee') {
          navigate('/employee-dashboard');
        } else {
          setError('Invalid role');
        }
      } else {
        setError(message);
      }
    } catch (error) {
      setLoading(false);
      setError('Error logging in');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
          </Button>
          {error && <Typography color="error" mt={2}>{error}</Typography>}
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
