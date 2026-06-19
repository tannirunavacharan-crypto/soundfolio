const mongoose = require('mongoose');
const JsonModel = require('../utils/jsonDb');

// 1. Define Mongoose Schema
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a service title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a service description'],
      trim: true,
    },
    turnaroundTime: {
      type: String,
      required: [true, 'Please add turnaround time details'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compile Mongoose Model
let MongooseServiceModel;
try {
  MongooseServiceModel = mongoose.model('Service');
} catch (e) {
  MongooseServiceModel = mongoose.model('Service', serviceSchema);
}

// 2. Instantiate JSON Model
const JsonServiceModel = new JsonModel('Service');

// 3. Dynamic Export proxy
const serviceProxy = new Proxy({}, {
  get: (target, prop) => {
    const activeModel = global.dbMode === 'mongodb' ? MongooseServiceModel : JsonServiceModel;
    return activeModel[prop];
  }
});

module.exports = serviceProxy;
