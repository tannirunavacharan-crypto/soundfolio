const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error('Get Testimonials Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = async (req, res) => {
  try {
    const { clientName, feedback, rating } = req.body;

    if (!clientName || !feedback || rating === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide clientName, feedback, and rating' });
    }

    const testimonial = await Testimonial.create({
      clientName,
      feedback,
      rating: parseInt(rating),
    });

    return res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error('Create Testimonial Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    let testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    if (req.body.rating !== undefined) {
      req.body.rating = parseInt(req.body.rating);
    }

    testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error('Update Testimonial Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Testimonial removed successfully',
    });
  } catch (error) {
    console.error('Delete Testimonial Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
