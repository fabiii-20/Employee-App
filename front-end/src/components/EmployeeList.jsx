import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { Container, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import EmployeeNavbar from './EmployeeNavbar';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get('/admin/employee')
      .then(response => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setError('Error fetching employees. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" mt={4} align="center">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" mt={4}>
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  return (
    <>
      <EmployeeNavbar />
      <Container maxWidth="md" mt={4}>
        <Typography variant="h4" gutterBottom>Employee List</Typography>
        <Grid container spacing={3}>
          {employees.map(employee => (
            <Grid key={employee._id} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">{employee.name}</Typography>
                  <Typography variant="subtitle1" gutterBottom>{employee.position}</Typography>
                  <Typography variant="body2" color="textSecondary">Salary: ${employee.salary}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default EmployeeList;
