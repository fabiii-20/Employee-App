// routes/user.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Employee = require('../models/employee');

// Login route for both admin and employee
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if an admin exists with the given email
        let user = await Admin.findOne({ email });
        
        // If admin doesn't exist, check if an employee exists with the given email
        if (!user) {
            user = await Employee.findOne({ email });
        }

        // If neither admin nor employee exists with the given email, return error
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Determine the role
        const role = user instanceof Admin ? 'admin' : 'employee';

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, role, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
