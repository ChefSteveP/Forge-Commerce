var express = require("express");
var router = express.Router();

// const { db, auth } = require("../../firebase.js");
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

const { MailSlurp } = require("mailslurp-client");
const fetchApi = require("isomorphic-fetch");
const { AliasControllerApi, Configuration } = require("mailslurp-client");

// setup mailslurp config
const config = new Configuration({
  apiKey: process.env.MAILSLURP_API_KEY,
  fetchApi,
});

// create controller

const aliasControllerApi = new AliasControllerApi(config);

async function createAliasEmail(mail) {
  try {
    const alias = await aliasControllerApi.createAlias({
      createAliasOptions: {
        emailAddress: mail,
        useThreads: true,
      },
    });

    console.log("creation", alias.emailAddress);
    return alias.emailAddress;
  } catch (error) {
    console.error("Error creating alias:", error);
  }
}

// add user
// add user
router.post("/", async function (req, res) {
  try {
    console.log(req.body.email);
    const alias = await createAliasEmail(req.body.email);
    console.log("inside post: ", alias);
    const ref = await addDoc(collection(db, "users"), {
      ...req.body,
      savedItems: [],
      aliasEmail: alias,
    });
    return res.status(201).json({ message: "Post successful", id: ref.id });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
