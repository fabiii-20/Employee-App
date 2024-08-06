import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const AdminNavbar = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear any authentication tokens or session data
    // For example, if using localStorage:
    localStorage.removeItem('token');

    // Redirect the user to the login page
    navigate('/');
  };

  const handleAddEmployees = () => {
    navigate('/employee-add');
  };

  const handleEmployeeList = () => {
    navigate('/employee-list-admin'); // Navigate to the employee list page
  };
  return (
    <>
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee App
          </Typography>
          <Button color="inherit" onClick={handleAddEmployees}>Employee Form</Button>
          <Button color="inherit" onClick={handleEmployeeList}>Employees</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
};

export default AdminNavbar;
