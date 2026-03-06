const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const dresses = await db('dresses').orderBy('created_at', 'desc');
        res.json(dresses);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { name, category, description, price } = req.body;
    const image_url = req.file ? req.file.path : null;
    if (!image_url) return res.status(400).json({ message: 'Image is required' });

    try {
        const [id] = await db('dresses').insert({ name, category, description, price, image_url });
        const newDress = await db('dresses').where({ id }).first();
        res.json(newDress);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', [auth, upload.single('image')], async (req, res) => {
    const { id } = req.params;
    const { name, category, description, price } = req.body;

    // Prepare the update object
    const updateData = { name, category, description, price, updated_at: db.fn.now() };

    // If a new image was uploaded, update the image_url as well
    if (req.file) {
        updateData.image_url = req.file.path;
    }

    try {
        await db('dresses')
            .where({ id })
            .update(updateData);

        const updatedDress = await db('dresses').where({ id }).first();
        if (!updatedDress) return res.status(404).json({ message: 'Dress not found' });

        res.json(updatedDress);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await db('dresses').where({ id: req.params.id }).del();
        res.json({ message: 'Dress removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
module.exports = router;
