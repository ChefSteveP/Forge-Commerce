import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Box, Typography, IconButton, TextField, Button, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserListing = () => {
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ title: '', price: '', pictureURL: '' });
  const username = "Jacob Wald"; // replace this with the username from auth

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/${username}`);
        setListings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [username]);

  const startEditing = (listing) => {
    setEditingId(listing.id);
    setEditingData({ title: listing.title, price: listing.price, pictureURL: listing.pictureURL });
  };

  const handleEditChange = (event) => {
    setEditingData({ ...editingData, [event.target.name]: event.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:9000/${editingId}`, editingData);
      setListings(listings.map(listing => listing.id === editingId ? { ...listing, ...editingData } : listing));
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (listingID) => {
    try {
      await axios.delete(`http://localhost:9000/${listingID}`);
      // Remove the deleted listing from state
      setListings(listings.filter(listing => listing.id !== listingID));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={3}>
      {listings.map((listing) => (
        <Grid item key={listing.id}>
          <Card>
            <CardContent>
              {editingId === listing.id ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <TextField name="pictureURL" label="Picture URL" value={editingData.pictureURL} onChange={handleEditChange} />
                  <TextField name="title" label="Title" value={editingData.title} onChange={handleEditChange} />
                  <TextField name="price" label="Price" value={editingData.price} onChange={handleEditChange} />
                  <Button onClick={handleSaveEdit}>Save</Button>
                </Box>
              ) : (
                <Box display="flex" alignItems="center">
                  <Box>
                    <img src={listing.pictureURL} alt="Product" width="100" />
                  </Box>
                  <Box flex="1" ml={2}>
                    <Typography variant="h5">{listing.title}</Typography>
                    <Typography variant="body2">Price: {listing.price}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => startEditing(listing)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(listing.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserListing;
