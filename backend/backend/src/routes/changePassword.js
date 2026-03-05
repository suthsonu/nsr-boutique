const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const router = express.Router();

router.post('/change-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const hash = await bcrypt.hash(newPassword, 10);

        await db('admin_users')
            .where({ email })
            .update({ password: hash });

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating password' });
    }
});

module.exports = router;
