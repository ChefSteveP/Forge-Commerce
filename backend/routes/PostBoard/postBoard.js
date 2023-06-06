var express = require("express");
var router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");

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

AWS.config.update({
  accessKeyId: "AKIASQT3AVMZSS4OFABR",
  secretAccessKey: "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",
  region: "us-east-2",
});

const s3 = new AWS.S3();

const upload = multer({ storage: multer.memoryStorage() });

// get all listings for other users
router.get("/:username", async function (req, res) {
  try {
    const q = query(
      collection(db, "products"),
      where("listedby", "!=", req.params.username)
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
// router.post("/", async function (req, res) {
//   try {
//     console.log("req file image:", req.files);
//     const ref = await addDoc(collection(db, "products"), req.body);
//     console.log(ref.id);
//     return res.status(201).json({ message: "Post successful", id: ref.id });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

router.post("/", upload.single("image"), async function (req, res) {
  try {
    const imageFile = req.file;

    // Handle the file upload to AWS S3 and retrieve the image URL
    const s3UploadResponse = await s3
      .upload({
        Bucket: "forge-swe-week3-team2",
        Key: imageFile.originalname,
        Body: imageFile.buffer,
      })
      .promise();

    const imageUrl = s3UploadResponse.Location;

    // Store the image URL and other fields in the Firebase database
    const newDocRef = await addDoc(collection(db, "products"), {
      ...req.body,
      imageUrl,
    });

    return res
      .status(201)
      .json({ message: "Post successful", id: newDocRef.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
