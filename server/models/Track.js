const mongoose = require('mongoose');
const JsonModel = require('../utils/jsonDb');

// 1. Define Mongoose Schema
const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a track title'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Please add a genre'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: ['Film', 'Jingle', 'Arrangement', 'Background Score', 'Commercial'],
    },
    description: {
      type: String,
      trim: true,
    },
    audioUrl: {
      type: String,
      required: [true, 'Please add an audio URL'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '0:00',
    },
  },
  {
    timestamps: true,
  }
);

// Compile Mongoose Model
let MongooseTrackModel;
try {
  MongooseTrackModel = mongoose.model('Track');
} catch (e) {
  MongooseTrackModel = mongoose.model('Track', trackSchema);
}

// 2. Instantiate JSON Model
const JsonTrackModel = new JsonModel('Track');

// 3. Dynamic Export proxy
const trackProxy = new Proxy({}, {
  get: (target, prop) => {
    const activeModel = global.dbMode === 'mongodb' ? MongooseTrackModel : JsonTrackModel;
    return activeModel[prop];
  }
});

module.exports = trackProxy;
