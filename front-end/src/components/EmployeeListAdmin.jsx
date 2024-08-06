import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';

const EmployeeListAdmin = () => {
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

  const handleDeleteEmployee = async (id) => {
    try {
      await axiosInstance.delete(`/admin/employee/${id}`); // Added missing backticks around the template literal
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <AdminNavbar/>
    <TableContainer component={Paper}>
      <Table aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee._id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.password}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>
                <Button component={Link} to={`/employee-form/${employee._id}`} variant="outlined" color="primary"> {/* Added backticks around the template literal */}
                  Update
                </Button>
                <Button onClick={() => handleDeleteEmployee(employee._id)} variant="outlined" color="secondary" sx={{ marginLeft: 1 }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default EmployeeListAdmin;
