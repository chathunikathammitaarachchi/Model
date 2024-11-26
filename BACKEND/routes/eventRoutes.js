const express = require('express');
const Event = require('../models/Event');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err });
  }
});


router.post('/', async (req, res) => {
  const { title, date, time } = req.body;

  try {
    const newEvent = new Event({ title, date, time });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err });
  }
});


router.put('/:id', async (req, res) => {
  const { title, date, time } = req.body;
  const eventId = req.params.id;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, date, time },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err });
  }
});


router.delete('/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err });
  }
});

module.exports = router;
