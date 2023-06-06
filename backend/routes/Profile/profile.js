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

// get all listings for a user
router.get("/", async function (req, res) {
  try {
    let query = await getDocs(collection(db, "products"));
    let response = [];
    query.forEach((doc) => response.push({ ...doc.data(), id: doc.id }));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// add listing
router.post("/", async function (req, res) {
  try {
    const ref = await addDoc(collection(db, "products"), req.body);
    console.log(ref.id);
    return res.status(201).json({ message: "Post successful", id: ref.id });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// edit listing
router.put("/:listingID", async function (req, res) {
  try {
    const ref = await updateDoc(
      doc(db, "products", req.params.listingID),
      req.body
    );
    return res.status(200).json({ message: "edit successful", id: ref.id });
  } catch (error) {
    return res.status(405).json(error);
  }
});

// delete listing
router.delete("/:listingID", async function (req, res) {
  try {
    await deleteDoc(doc(db, "products", req.params.listingID));
    return res.status(200).json({ message: "deletion successful" });
  } catch (error) {
    return res.status(404).json(error);
  }
});

module.exports = router;
