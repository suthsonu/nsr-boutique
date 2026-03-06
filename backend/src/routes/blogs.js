const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    try {
        const blogs = await db('blogs').orderBy('created_at', 'desc');
        res.json(blogs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const blog = await db('blogs').where({ id: req.params.id }).first();
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { title, content, meta_title, meta_description } = req.body;
    const featured_image = req.file ? req.file.path : null;
    if (!featured_image) return res.status(400).json({ message: 'Image is required' });

    try {
        const [id] = await db('blogs').insert({ title, content, featured_image, meta_title, meta_description });
        const newBlog = await db('blogs').where({ id }).first();
        res.json(newBlog);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await db('blogs').where({ id: req.params.id }).del();
        res.json({ message: 'Blog removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
module.exports = router;
