require('dotenv').config();
const jwt = require('jsonwebtoken');

// 1. Generate a valid token using the env secret
const token = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET || 'nsr_boutique_super_secret_key_2024', { expiresIn: '1h' });
console.log(token);
