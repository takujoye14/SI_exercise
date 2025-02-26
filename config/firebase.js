const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const serviceAccountPath = path.join(__dirname, "..", process.env.FIREBASE_CREDENTIALS);
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
