


const express = require('express');
const Review = require('../models/Review'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { text, rating } = req.body;
        const review = new Review({ text, rating });
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add review' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { text, rating } = req.body;
        const review = await Review.findByIdAndUpdate(id, { text, rating }, { new: true });
        res.json(review);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update review' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete review' });
    }
});

module.exports = router;
