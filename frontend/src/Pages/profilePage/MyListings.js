import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from 'axios';
import { auth } from "../../app/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

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
        axios.get(`http://localhost:9000/profile/user/${curUser}`)
            .then(res => {
                setUsername(res.data.name);
                // Fetch listings by this user
                axios.get(`http://localhost:9000/profile/${res.data.name}`)
                    .then(res => {
                        setListings(res.data);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));}
    }, [curUser]);


    const editListing = (index, listingID) => {
        // Put request to edit listing
        axios.put(`http://localhost:9000/profile/${listingID}`, listings[index])
            .then(res => {
                console.log(res.data);
                setEditIndex(null);
            })
            .catch(err => console.error(err));
    }

    const deleteListing = (listingID) => {
        // Delete request to delete listing
        axios.delete(`http://localhost:9000/profile/${listingID}`)
            .then(res => {
                console.log(res.data);
                // Update listings
                setListings(listings.filter((listing) => listing.id !== listingID));
            })
            .catch(err => console.error(err));
    }

    return (
        <Box>
            {username && <h2>{username}'s Listings</h2>}
            {listings.map((listing, index) => (
                <Box key={listing.id} sx={{ mb: 2 }}>
                    {editIndex === index ? (
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={listing.description}
                            onChange={(e) => {
                                const newListings = [...listings];
                                newListings[index].description = e.target.value;
                                setListings(newListings);
                            }}
                        />
                    ) : (
                        <p>{listing.description}</p>
                    )}
                    {editIndex === index ? (
                        <Button onClick={() => editListing(index, listing.id)}>
                            Save
                        </Button>
                    ) : (
                        <Button onClick={() => setEditIndex(index)}>
                            Edit
                        </Button>
                    )}
                    <Button onClick={() => deleteListing(listing.id)}>
                        Delete
                    </Button>
                </Box>
            ))}
        </Box>
    );
}

export default MyListings;
