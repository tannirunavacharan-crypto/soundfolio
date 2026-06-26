const mongoose = require('mongoose');
const JsonModel = require('../utils/jsonDb');
const FirebaseModel = require('../utils/firebaseDb');

// 1. Define Mongoose Schema
const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Please add a client name'],
      trim: true,
    },
    feedback: {
      type: String,
      required: [true, 'Please add feedback content'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: 1,
      max: 5,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Compile Mongoose Model
let MongooseTestimonialModel;
try {
  MongooseTestimonialModel = mongoose.model('Testimonial');
} catch (e) {
  MongooseTestimonialModel = mongoose.model('Testimonial', testimonialSchema);
}

// 2. Instantiate JSON Model
const JsonTestimonialModel = new JsonModel('Testimonial');

// 3. Instantiate Firebase Model
const FirebaseTestimonialModel = new FirebaseModel('Testimonial');

// 4. Dynamic Export proxy
const testimonialProxy = new Proxy({}, {
  get: (target, prop) => {
    const activeModel = 
      global.dbMode === 'firebase' ? FirebaseTestimonialModel :
      global.dbMode === 'mongodb' ? MongooseTestimonialModel : JsonTestimonialModel;
    return activeModel[prop];
  }
});

module.exports = testimonialProxy;
