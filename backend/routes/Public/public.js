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
  getDoc,
} = require("firebase/firestore");

// get all items
router.get("/all-items", async function (req, res) {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    let response = [];
    querySnapshot.forEach((doc) => {
      let itemData = doc.data();
      delete itemData.listedby;
      delete itemData.aliasEmail;
      itemData.id = doc.id;
      response.push(itemData);
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// get a specific item
router.get("/item/:id", async function (req, res) {
  // get item from products collection
  // id refers to document id
  const itemRef = doc(db, "products", req.params.id);
  const itemDoc = await getDoc(itemRef);
  if (itemDoc.exists()) {
    const itemData = itemDoc.data();
    delete itemData.listedby;
    delete itemData.aliasEmail;
    return res.status(200).json(itemData);
  } else {
    console.log("No such document!");
    return res.status(404).json("No such document!");
  }
});

module.exports = router;
