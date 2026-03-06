const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const images = await db('gallery').orderBy('created_at', 'desc');
        res.json(images);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const image_url = req.file ? req.file.path : null;
    if (!image_url) return res.status(400).json({ message: 'Image is required' });

    try {
        const [id] = await db('gallery').insert({ image_url });
        const newImage = await db('gallery').where({ id }).first();
        res.json(newImage);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await db('gallery').where({ id: req.params.id }).del();
        res.json({ message: 'Image removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
module.exports = router;
