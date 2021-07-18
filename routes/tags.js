const express = require('express');
const router = express.Router();

const Tag = require('../models/Tag');

// Get tags
// Public
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find().collation({locale: 'en', strength: 1}).sort({name: 1});
        res.send(tags);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

// Get specific tag
// Public
router.get('/:tag_id', async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.tag_id);
        if (!tag) {
            return res.status(404).send("Not Found");
        }
        res.send(tag);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

module.exports = router;