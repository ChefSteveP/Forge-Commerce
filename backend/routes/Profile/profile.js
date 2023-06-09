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

// get user name from email
router.get("/user/:email", async function (req, res) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", req.params.email)
    );
    const querySnapshot = await getDocs(q);
    let ret;
    querySnapshot.forEach((doc) => (ret = doc.data().name));
    return res
      .status(200)
      .json({ message: "successfully got username", name: ret });
  } catch (error) {
    return res.status(404).json(error);
  }
});

// get all listings for a specific user
router.get("/:username", async function (req, res) {
  try {
    const q = query(
      collection(db, "products"),
      where("listedby", "==", req.params.username)
    );
    const querySnapshot = await getDocs(q);
    let response = [];
    querySnapshot.forEach((doc) =>
      response.push({ ...doc.data(), id: doc.id })
    );

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
    await updateDoc(doc(db, "products", req.params.listingID), req.body);
    return res
      .status(200)
      .json({ message: "edit successful", id: req.params.listingID });
  } catch (error) {
    console.log(error);
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

// sell listing
router.put("/sell/:listingID", async function (req, res) {
  try {
    await updateDoc(doc(db, "products", req.params.listingID), {
      isSold: true,
    });
    return res.status(200).json({ message: "item sold" });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

// Unsell listing
router.put("/unsell/:listingID", async function (req, res) {
  try {
    await updateDoc(doc(db, "products", req.params.listingID), {
      isSold: false,
    });
    return res.status(200).json({ message: "item unsold" });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});


// get all listings for specific user that is sold and add their price 
router.get("/earnings/:username", async function (req, res) {
  try {
    const q = query(
      collection(db, "products"),
      where("listedby", "==", req.params.username),
      where("isSold", "==", true)
    );
    const querySnapshot = await getDocs(q);
    let totalEarnings = 0;
    querySnapshot.forEach((doc) => {
      totalEarnings += doc.data().price;
    });

    return res.status(200).json({ earnings: totalEarnings });
  } catch (error) {
    return res.status(404).json(error);
  }
});



module.exports = router;
