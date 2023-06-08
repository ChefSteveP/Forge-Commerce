import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { auth } from "../../app/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

function ProfileCard() {
  const [user, setUser] = useState(null);

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
    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:9000/profile/user/${curUser}`
      );
      const data = await response.json();
      if (response.ok) {
        setUser({ email: curUser, name: data.name });
      } else {
        console.error("Error fetching user:", data);
      }
    };
    if (curUser) {
      fetchUser();
    }
  }, [curUser]);

  return (
    <Box>
      <Card
        sx={{
          backgroundColor: "light-lilac",
          color: "black",
          width: "100%",
          maxWidth: 345,
          marginBottom: "1em",
          "@media (max-width:600px)": {
            width: "80%",
            margin: "1em auto",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ fontSize: 24, fontWeight: "bold" }}
          >
            My Info
          </Typography>
          <Typography variant="body2" component="p" sx={{ fontSize: 16 }}>
            Email: {user?.email}
          </Typography>
          <Typography variant="body2" component="p" sx={{ fontSize: 16 }}>
            Name: {user?.name}
          </Typography>
          <Typography variant="body2" component="p" sx={{ fontSize: 16 }}>
            Earnings: $152.30
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfileCard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';

// const ProfileCard = ({ username }) => {
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [editPhone, setEditPhone] = useState(false);

//   // Fetch user details on component mount using useEffect
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(`/user/${username}`);
//         setEmail(response.data.email);
//         setPhone(response.data.phone);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUserDetails();
//   }, [username]);

//   const handleEdit = () => {
//     setEditPhone(!editPhone);
//   }

//   const handleSave = async () => {
//     try {
//       // Update user phone number using axios and Firebase API
//       await axios.put(`/user/${username}`, { phone });
//       setEditPhone(false);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h5" component="div">
//           My Profile
//         </Typography>
//         <Typography variant="body2">
//           Email: {email}
//         </Typography>
//         {editPhone ? (
//           <TextField
//             label="Phone"
//             value={phone}
//             onChange={event => setPhone(event.target.value)}
//           />
//         ) : (
//           <Typography variant="body2">
//             Phone: {phone}
//           </Typography>
//         )}
//         <IconButton onClick={editPhone ? handleSave : handleEdit}>
//           {editPhone ? <SaveIcon /> : <EditIcon />}
//         </IconButton>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProfileCard;
