var express = require("express");
var router = express.Router();

const { db, auth } = require("../../firebase.js");
// const db = require("../../firebase.js");
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

let currentUser = {};
onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

// Route for user login
router.post("/", async function (req, res) {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Route for user logout
router.get("/logout", async function (req, res) {
  try {
    await signOut(auth);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Route for creating a new user
router.post("/create-user", async function (req, res) {
  try {
    const { email, password } = req.body;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return res
      .status(201)
      .json({ message: "User created successfully", user: user });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Route to get the current user
router.get("/current-user", (req, res) => {
  const user = auth.currentUser;

  if (user) {
    // User is authenticated
    const { uid, email } = user;
    return res.status(200).json({ uid, email });
  } else {
    // User is not authenticated
    return res.status(401).json({ message: "User not authenticated" });
  }
});

// // get all users
// router.get("/", async function (req, res) {
//   try {
//     const response = await getDocs(collection(db, "users"));
//     let ret = [];
//     response.forEach((doc) => ret.push({ ...doc.data(), id: doc.id }));
//     return res.status(200).json(ret);
//   } catch (error) {
//     return res.status(404).json(error);
//   }
// });

// // add user
// router.post("/", async function (req, res) {
//   try {
//     const ref = await addDoc(collection(db, "products"), req.body);
//     console.log(ref.id);
//     return res.status(201).json({ message: "Post successful", id: ref.id });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

module.exports = router;
