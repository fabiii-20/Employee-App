import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm() {
    const { id } = useParams(); // Get the employee ID from the URL params
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the employee details if editing an existing employee
        if (id) {
            axiosInstance.get(`/admin/employee/${id}`) // Added backticks around the template literal
                .then(response => {
                    const { name, position, salary, email, password } = response.data;
                    setName(name);
                    setPosition(position);
                    setSalary(salary);
                    setEmail(email);
                    setPassword(password);
                })
                .catch(error => {
                    console.error('Error fetching employee details:', error);
                });
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const employeeData = { name, position, salary, email, password };
            if (id) {
                // If updating an existing employee, send a PUT request
                await axiosInstance.put(`/admin/employee/${id}`, employeeData); // Added backticks around the template literal
            } else {
                // If adding a new employee, send a POST request
                await axiosInstance.post('/admin/employee', employeeData);
            }
            navigate('/employee-list-admin');
            alert('Employee saved successfully!');
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <>
        <AdminNavbar/>
        <Container maxWidth="md">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>{id ? 'Update Employee' : 'Add New Employee'}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Position"
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Salary"
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        {id ? 'Update Employee' : 'Add Employee'}
                    </Button>
                </form>
            </Box>
        </Container>
        </>
    );
}

export default EmployeeForm;
