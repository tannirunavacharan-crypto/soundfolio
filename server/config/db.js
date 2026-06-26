const mongoose = require('mongoose');
const admin = require('firebase-admin');
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');
const fs = require('fs');
const path = require('path');

global.dbMode = 'json'; // Default fallback mode
global.firestoreDb = null; // Decoupled Firestore database instance

const connectDB = async () => {
  let firebaseConfigured = false;

  // 1. Try initializing client SDK Firebase using provided config variables
  if (process.env.FIREBASE_API_KEY && process.env.FIREBASE_PROJECT_ID) {
    try {
      console.log('Attempting connection to Firebase using Web App Configuration...');
      let clientApp;
      if (firebase.apps.length === 0) {
        clientApp = firebase.initializeApp({
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        });
      } else {
        clientApp = firebase.app();
      }
      global.firestoreDb = clientApp.firestore();
      firebaseConfigured = true;
      global.dbMode = 'firebase';
      
      console.log('--------------------------------------------------');
      console.log('🚀 DATABASE STATUS: Connected to Firebase Firestore (Client SDK) successfully!');
      console.log(`Project ID: ${process.env.FIREBASE_PROJECT_ID}`);
      console.log('--------------------------------------------------');
      return;
    } catch (error) {
      console.error('Failed to initialize Firebase with Client configurations:', error.message);
    }
  }

  // 2. Try initializing admin SDK Firebase if credentials or files are present
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      admin.initializeApp({
        credential: admin.cert(serviceAccount)
      });
      global.firestoreDb = admin.firestore();
      firebaseConfigured = true;
    } catch (error) {
      console.error('Failed to initialize Firebase Admin with FIREBASE_SERVICE_ACCOUNT_JSON:', error.message);
    }
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    try {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
      admin.initializeApp({
        credential: admin.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey
        })
      });
      global.firestoreDb = admin.firestore();
      firebaseConfigured = true;
    } catch (error) {
      console.error('Failed to initialize Firebase Admin with environment variables:', error.message);
    }
  } else {
    // Check if server/config/serviceAccountKey.json exists
    const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
    if (fs.existsSync(serviceAccountPath)) {
      try {
        const serviceAccount = require(serviceAccountPath);
        admin.initializeApp({
          credential: admin.cert(serviceAccount)
        });
        global.firestoreDb = admin.firestore();
        firebaseConfigured = true;
      } catch (error) {
        console.error('Failed to initialize Firebase Admin with serviceAccountKey.json:', error.message);
      }
    }
  }

  if (firebaseConfigured) {
    global.dbMode = 'firebase';
    console.log('--------------------------------------------------');
    console.log('🚀 DATABASE STATUS: Connected to Firebase Firestore (Admin SDK) successfully!');
    console.log(`Project ID: ${process.env.FIREBASE_PROJECT_ID || 'Configured'}`);
    console.log('--------------------------------------------------');
    return;
  }

  // 3. Fall back to MongoDB if Firebase is not configured
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/soundfolio';
  
  try {
    console.log('Firebase not configured. Connecting to MongoDB...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    
    global.dbMode = 'mongodb';
    console.log('--------------------------------------------------');
    console.log('🚀 DATABASE STATUS: Connected to MongoDB successfully!');
    console.log(`URI: ${uri.replace(/\/\/.*@/, '//***:***@')}`); // log masked URI
    console.log('--------------------------------------------------');
  } catch (error) {
    global.dbMode = 'json';
    console.log('--------------------------------------------------');
    console.log('⚠️ DATABASE WARNING: MongoDB connection failed.');
    console.log(`Reason: ${error.message}`);
    console.log('💾 FALLBACK ACTIVATED: Running on local JSON database.');
    console.log('Data stores are managed inside server/data/*.json');
    console.log('--------------------------------------------------');
  }
};

module.exports = connectDB;
