const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db('admin_users').where({ email }).first();
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/reset-password', async (req, res) => {
    const { email, secretKey, newPassword } = req.body;
    try {
        // Validate secret key
        if (!process.env.ADMIN_RESET_SECRET) {
            return res.status(500).json({ message: 'Server configuration error: Reset Secret not set' });
        }
        if (secretKey !== process.env.ADMIN_RESET_SECRET) {
            return res.status(401).json({ message: 'Invalid secret key' });
        }

        // Validate user existence
        const user = await db('admin_users').where({ email }).first();
        if (!user) {
            return res.status(404).json({ message: 'Admin user not found' });
        }

        // Hash new password and update
        const hash = await bcrypt.hash(newPassword, 10);
        await db('admin_users').where({ email }).update({ password: hash, updated_at: db.fn.now() });

        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
