var express = require("express");
var router = express.Router();

const db = require("../../firebase.js");
const {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  deleteDoc,
} = require("firebase/firestore");

// get all users
router.get("/", async function (req, res) {
  try {
    const response = await getDocs(collection(db, "users"));
    let ret = [];
    response.forEach((doc) => ret.push({ ...doc.data(), id: doc.id }));
    return res.status(200).json(ret);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// add user
router.post("/", async function (req, res) {
  try {
    const ref = await addDoc(collection(db, "products"), req.body);
    console.log(ref.id);
    return res.status(201).json({ message: "Post successful", id: ref.id });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
