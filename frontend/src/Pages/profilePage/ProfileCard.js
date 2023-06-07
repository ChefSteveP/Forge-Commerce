import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const ProfileCard = ({ username }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editPhone, setEditPhone] = useState(false);

  // Fetch user details on component mount using useEffect
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/user/${username}`);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleEdit = () => {
    setEditPhone(!editPhone);
  }

  const handleSave = async () => {
    try {
      // Update user phone number using axios and Firebase API
      await axios.put(`/user/${username}`, { phone });
      setEditPhone(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          My Profile
        </Typography>
        <Typography variant="body2">
          Email: {email}
        </Typography>
        {editPhone ? (
          <TextField
            label="Phone"
            value={phone}
            onChange={event => setPhone(event.target.value)}
          />
        ) : (
          <Typography variant="body2">
            Phone: {phone}
          </Typography>
        )}
        <IconButton onClick={editPhone ? handleSave : handleEdit}>
          {editPhone ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
