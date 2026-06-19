const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('Get Services Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
  try {
    const { title, description, turnaroundTime } = req.body;

    if (!title || !description || !turnaroundTime) {
      return res.status(400).json({ success: false, message: 'Please provide title, description, and turnaroundTime' });
    }

    const service = await Service.create({
      title,
      description,
      turnaroundTime,
    });

    return res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Create Service Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    let service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    service = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Update Service Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    await service.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Service removed successfully',
    });
  } catch (error) {
    console.error('Delete Service Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
};
