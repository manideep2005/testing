const express = require("express");
const mysql = require('mysql2');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require('cors');  // Add this line
const connection = require('./db'); // Import the MySQL connection

const app = express();
app.use(cors());  // Use CORS middleware
app.use(bodyParser.json());

// Sign-up API
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: "Error hashing password" });
            }

            // Save user to the database
            connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Database error" });
                }
                res.status(201).json({ message: "User registered successfully!" });
            });
        });
    });
});

// Sign-in API
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: "User not found!" });
        }

        // Compare the password
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Error comparing passwords" });
            }

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials!" });
            }

            // Generate a token
            const token = jwt.sign({ userId: results[0].id }, 'your_jwt_secret', { expiresIn: '1h' });

            res.status(200).json({ success: true, token });
        });
    });
});
const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
