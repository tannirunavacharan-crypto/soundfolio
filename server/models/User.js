const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JsonModel = require('../utils/jsonDb');
const FirebaseModel = require('../utils/firebaseDb');

// 1. Define Mongoose Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt before save (Mongoose Hook)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Compile Mongoose Model
let MongooseUserModel;
try {
  MongooseUserModel = mongoose.model('User');
} catch (e) {
  MongooseUserModel = mongoose.model('User', userSchema);
}

// 2. Instantiate JSON Model
const JsonUserModel = new JsonModel('User');

// 3. Instantiate Firebase Model
const FirebaseUserModel = new FirebaseModel('User');

// 4. Dynamic Export proxy
const userProxy = new Proxy({}, {
  get: (target, prop) => {
    const activeModel = 
      global.dbMode === 'firebase' ? FirebaseUserModel :
      global.dbMode === 'mongodb' ? MongooseUserModel : JsonUserModel;
    return activeModel[prop];
  }
});

module.exports = userProxy;
