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

// add an item to a user's cart
router.post("/add", async function (req, res) {
  try {
    console.log(req.body);
    const email = req.body.email;
    const itemID = req.body.id;
    // get item from products collection and increment amountSaved by 1
    // id refers to document id
    const itemRef = doc(db, "products", itemID);
    const itemDoc = await getDoc(itemRef);
    if (itemDoc.exists()) {
      const itemData = itemDoc.data();
      const newAmountSaved = itemData.amountSaved + 1;
      await updateDoc(itemRef, { amountSaved: newAmountSaved });
    } else {
      console.log("No such document!");
    }

    // add document id to user's saved items in database
    // get user document from email field
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    // add document id to savedItems array
    querySnapshot.forEach(async (item) => {
      const userRef = doc(db, "users", item.id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newSavedItems = userData.savedItems;
        newSavedItems.push(itemID);
        await updateDoc(userRef, { savedItems: newSavedItems });
      } else {
        console.log("No such document!");
      }
    });
    return res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    return res.status(404).json(error);
  }
});

module.exports = router;
