import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { auth } from "../../app/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { Container, Grid, Typography } from "@mui/material";

import EditablePostCard from "./EditablePostCard.js";
import SoldPostCard from "./SoldPostCard.js";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [username, setUsername] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setCurUser(user.email);
        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (curUser) {
      // Get current user's email
      // const email = auth.currentUser ? auth.currentUser.email : null;

      // Fetch username
      axios
        .get(`http://localhost:9000/profile/user/${curUser}`)
        .then((res) => {
          setUsername(res.data.name);
          // Fetch listings by this user
          axios
            .get(`http://localhost:9000/profile/${curUser}`)
            .then((res) => {
              console.log(res.data);
              setListings(res.data);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  }, [curUser]);

  const editListing = (index, listingID) => {
    // Put request to edit listing
    axios
      .put(`http://localhost:9000/profile/${listingID}`, listings[index])
      .then((res) => {
        console.log(res.data);
        setEditIndex(null);
      })
      .catch((err) => console.error(err));
  };

  const deleteListing = (listingID) => {
    // Delete request to delete listing
    axios
      .delete(`http://localhost:9000/profile/${listingID}`)
      .then((res) => {
        console.log(res.data);
        // Update listings
        setListings(listings.filter((listing) => listing.id !== listingID));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      {username && <h2 style={{ fontWeight: "bolder" }}>My Listings</h2>}
      <Container maxWidth="fullWidth">
        <Grid container className="cardGrid" spacing={3}>
          {listings.map((listing, index) =>
            listing.isSold ? null : <EditablePostCard data={listing} />
          )}
        </Grid>
      </Container>
      {username && <h2 style={{ fontWeight: "bolder" }}>Sold Listings</h2>}
      <Container maxWidth="fullWidth">
        <Grid container className="cardGrid" spacing={3}>
          {listings.map((listing, index) =>
            listing.isSold ? <SoldPostCard data={listing} /> : null
          )}
        </Grid>
      </Container>
    </Box>
  );
};

//   return (
//     <Box>
//       {username && <h2 style={{ fontWeight: "bolder" }}>My Listings</h2>}
//       {console.log("listings:", listings)}
//       {listings.map((listing, index) => (
//         <Box key={listing.id} sx={{ mb: 2 }}>
//           {editIndex === index ? (
//             <TextField
//               fullWidth
//               variant="outlined"
//               value={listing.description}
//               onChange={(e) => {
//                 const newListings = [...listings];
//                 newListings[index].description = e.target.value;
//                 setListings(newListings);
//               }}
//             />
//           ) : (
//             <p>{listing.description}</p>
//           )}
//           {editIndex === index ? (
//             <Button onClick={() => editListing(index, listing.id)}>Save</Button>
//           ) : (
//             <Button onClick={() => setEditIndex(index)}>Edit</Button>
//           )}
//           <Button onClick={() => deleteListing(listing.id)}>Delete</Button>
//         </Box>
//       ))}
//     </Box>
//   );
// };

export default MyListings;
