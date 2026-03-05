const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');

// Public route: Get all APPROVED reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await db('reviews')
            .where({ status: 'approved' })
            .orderBy('created_at', 'desc');
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Admin route: Get ALL reviews (pending and approved)
router.get('/admin', auth, async (req, res) => {
    try {
        const reviews = await db('reviews').orderBy('created_at', 'desc');
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Public route: Submit a new review (defaults to pending)
router.post('/', async (req, res) => {
    const { name, rating, text } = req.body;
    if (!name || !rating || !text) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [id] = await db('reviews').insert({ name, rating, text, status: 'pending' });
        const newReview = await db('reviews').where({ id }).first();
        res.json(newReview);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Admin route: Approve a review
router.put('/:id/approve', auth, async (req, res) => {
    try {
        await db('reviews')
            .where({ id: req.params.id })
            .update({ status: 'approved', updated_at: db.fn.now() });
        res.json({ message: 'Review approved' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Admin route: Delete a review
router.delete('/:id', auth, async (req, res) => {
    try {
        await db('reviews').where({ id: req.params.id }).del();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
