const Inquiry = require('../models/Inquiry');
const { sendInquiryEmail } = require('../utils/mailer');

// @desc    Submit a new contact inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, timeline, description, platform } = req.body;

    // Simple validation
    if (!name || !email || !projectType || !description) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields (name, email, projectType, description)' });
    }

    // Determine platform (fallback to request headers if not provided by frontend)
    let userPlatform = platform;
    if (!userPlatform && req.headers['user-agent']) {
      const ua = req.headers['user-agent'];
      if (/windows/i.test(ua)) userPlatform = 'Windows';
      else if (/macintosh|mac os x/i.test(ua)) userPlatform = 'macOS';
      else if (/linux/i.test(ua)) userPlatform = 'Linux';
      else if (/android/i.test(ua)) userPlatform = 'Android';
      else if (/iphone|ipad|ipod/i.test(ua)) userPlatform = 'iOS';
      else userPlatform = 'Unknown/Other';
    } else if (!userPlatform) {
      userPlatform = 'Unknown';
    }

    // Save inquiry to MongoDB
    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      projectType,
      budget,
      timeline,
      description,
      platform: userPlatform,
    });

    // Send email alert to admin
    await sendInquiryEmail({
      name,
      email,
      phone,
      projectType,
      budget,
      timeline,
      description,
      platform: userPlatform,
    });

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error) {
    console.error('Create Inquiry Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error('Get Inquiries Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete/Archive an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    await inquiry.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Inquiry removed successfully',
    });
  } catch (error) {
    console.error('Delete Inquiry Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  deleteInquiry,
};
