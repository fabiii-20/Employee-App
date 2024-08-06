// routes/admin.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Employee = require('../models/employee');

// Admin registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body); 

    try {
        // Check if admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Create a new admin instance
        const admin = new Admin({
            email,
            password // Password will be hashed before saving due to pre-save middleware in the Admin model
        });

        // Save the admin to the database
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//get admin

router.get('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        console.error('Error getting admin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Add employee
router.post('/employee', async (req, res) => {
    const { name, email, password, position, salary } = req.body;
    try {
        const newEmployee = new Employee({
            name,
            email,
            password,
            position,
            salary
        });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete employee
router.delete('/employee/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// View employee
router.get('/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error viewing employee:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update employee
router.put('/employee/:id', async (req, res) => {
    try {
        const { name, email, password, position, salary } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, email, password, position, salary },
            { new: true }
        );
        res.json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/employee', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        console.error('Error getting all employees:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;
