const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, deleteInquiry } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');
const { sendInquiryEmail } = require('../utils/mailer');

router.get('/test-email', async (req, res) => {
  try {
    const result = await sendInquiryEmail({
      name: "Render Test Connection",
      email: "akbhuker642@gmail.com",
      phone: "1234567890",
      projectType: "Diagnostic Test",
      budget: "N/A",
      timeline: "N/A",
      description: "Diagnostic check to see if Render can connect to Gmail SMTP.",
      platform: "Render Server"
    });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message, stack: err.stack });
  }
});

router.route('/')
  .post(createInquiry)
  .get(protect, getInquiries);

router.route('/:id')
  .delete(protect, deleteInquiry);

module.exports = router;
