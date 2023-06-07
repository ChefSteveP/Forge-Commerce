const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

const serviceAccount = require("./permissions.json");

const app = initializeApp(serviceAccount);
const db = getFirestore(app);

module.exports = db;
