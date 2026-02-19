import express from 'express';
import Room from '../models/Room.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all rooms with filters
router.get('/', async (req, res) => {
  try {
    const { 
      minPrice, 
      maxPrice, 
      location, 
      type, 
      gender, 
      foodIncluded,
      facilities,
      search 
    } = req.query;

    let query = {};

    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (type) query.type = type;
    if (gender) query.gender = gender;
    if (foodIncluded !== undefined && foodIncluded !== null) {
      query.foodIncluded = foodIncluded === 'true';
    }
    if (facilities) {
      const facilitiesArray = facilities.split(',');
      query.facilities = { $all: facilitiesArray };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { area: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const rooms = await Room.find(query).sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new room (admin)
router.post('/', auth, async (req, res) => {
  try {
    const room = new Room(req.body);
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update room (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete room (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
