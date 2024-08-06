import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or session data
    // For example, if using localStorage:
    localStorage.removeItem('token');

    // Redirect the user to the login page
    navigate('/');
  };

  const handleEmployees = () => {
    navigate('/employee-list');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee App
        </Typography>
        <Button color="inherit" onClick={handleEmployees}>Employees</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default EmployeeNavbar;
