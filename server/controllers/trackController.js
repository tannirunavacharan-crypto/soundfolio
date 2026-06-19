const Track = require('../models/Track');

// @desc    Get all tracks with optional filtering
// @route   GET /api/tracks
// @access  Public
const getTracks = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by text search
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const tracks = await Track.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tracks.length,
      data: tracks,
    });
  } catch (error) {
    console.error('Get Tracks Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a track
// @route   POST /api/tracks
// @access  Private/Admin
const createTrack = async (req, res) => {
  try {
    const { title, genre, category, description, audioUrl, imageUrl, duration } = req.body;

    if (!title || !genre || !category || !audioUrl) {
      return res.status(400).json({ success: false, message: 'Please provide title, genre, category, and audioUrl' });
    }

    const track = await Track.create({
      title,
      genre,
      category,
      description,
      audioUrl,
      imageUrl,
      duration: duration || '0:00',
    });

    return res.status(201).json({
      success: true,
      data: track,
    });
  } catch (error) {
    console.error('Create Track Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a track
// @route   PUT /api/tracks/:id
// @access  Private/Admin
const updateTrack = async (req, res) => {
  try {
    const { id } = req.params;
    let track = await Track.findById(id);

    if (!track) {
      return res.status(404).json({ success: false, message: 'Track not found' });
    }

    track = await Track.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: track,
    });
  } catch (error) {
    console.error('Update Track Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a track
// @route   DELETE /api/tracks/:id
// @access  Private/Admin
const deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).json({ success: false, message: 'Track not found' });
    }

    await track.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Track removed successfully',
    });
  } catch (error) {
    console.error('Delete Track Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getTracks,
  createTrack,
  updateTrack,
  deleteTrack,
};
