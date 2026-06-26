const mongoose = require('mongoose');
const JsonModel = require('../utils/jsonDb');

// 1. Define Mongoose Schema
const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add your email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, 'Please specify the project type'],
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide project details'],
      trim: true,
    },
    platform: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
  },
  {
    timestamps: true,
  }
);

// Compile Mongoose Model
let MongooseInquiryModel;
try {
  MongooseInquiryModel = mongoose.model('Inquiry');
} catch (e) {
  MongooseInquiryModel = mongoose.model('Inquiry', inquirySchema);
}

// 2. Instantiate JSON Model
const JsonInquiryModel = new JsonModel('Inquiry');

// 3. Dynamic Export proxy
const inquiryProxy = new Proxy({}, {
  get: (target, prop) => {
    const activeModel = global.dbMode === 'mongodb' ? MongooseInquiryModel : JsonInquiryModel;
    return activeModel[prop];
  }
});

module.exports = inquiryProxy;
