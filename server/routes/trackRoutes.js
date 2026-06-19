const express = require('express');
const router = express.Router();
const { getTracks, createTrack, updateTrack, deleteTrack } = require('../controllers/trackController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTracks)
  .post(protect, createTrack);

router.route('/:id')
  .put(protect, updateTrack)
  .delete(protect, deleteTrack);

module.exports = router;
