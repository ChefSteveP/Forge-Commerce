import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { auth } from "../../app/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { Container, Grid } from "@mui/material";

import EditablePostCard from "./EditablePostCard.js";
import SoldPostCard from "./SoldPostCard.js";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [username, setUsername] = useState(null);
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
        .get(`https://forge-commerce.onrender.com/profile/user/${curUser}`)
        .then((res) => {
          setUsername(res.data.name);
          // Fetch listings by this user
          axios
            .get(`https://forge-commerce.onrender.com/profile/${curUser}`)
            .then((res) => {
              console.log(res.data);
              setListings(res.data);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  }, [curUser]);

  return (
    <Box>
      {username && (
        <h1
          style={{
            fontWeight: "bolder",
            marginLeft: "30px",
            color: "var(--dark-lilac)",
          }}
        >
          My Listings
        </h1>
      )}
      <Container maxWidth="fullWidth">
        <Grid container className="cardGrid" spacing={3}>
          {listings.map((listing, index) =>
            listing.isSold ? null : <EditablePostCard data={listing} />
          )}
        </Grid>
      </Container>
      {username && (
        <h1
          style={{
            fontWeight: "bolder",
            marginLeft: "30px",
            color: "var(--dark-lilac)",
          }}
        >
          Sold Listings
        </h1>
      )}
      <Container maxWidth="fullWidth">
        <Grid container className="cardGrid" spacing={3}>
          {listings.map((listing) =>
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
