const mongoose = require('mongoose');
const JsonModel = require('../utils/jsonDb');

// 1. Define Mongoose Schema
const projectSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Please add a client name'],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, 'Please add a project type (e.g. Film, Jingle)'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    year: {
      type: Number,
      required: [true, 'Please specify the project year'],
    },
  },
  {
    timestamps: true,
  }
);

// Compile Mongoose Model
let MongooseProjectModel;
try {
  MongooseProjectModel = mongoose.model('Project');
} catch (e) {
  MongooseProjectModel = mongoose.model('Project', projectSchema);
}

// 2. Instantiate JSON Model
const JsonProjectModel = new JsonModel('Project');

// 3. Dynamic Export proxy
const projectProxy = new Proxy({}, {
  get: (target, prop) => {
    const activeModel = global.dbMode === 'mongodb' ? MongooseProjectModel : JsonProjectModel;
    return activeModel[prop];
  }
});

module.exports = projectProxy;
