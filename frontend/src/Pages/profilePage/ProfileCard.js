import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Box, Button } from "@mui/material";
import { auth } from "../../app/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

// import { Container, Grid } from "@mui/material";

import SellIcon from "@mui/icons-material/Sell";
import SellItem from "../../Components/sellItem";



function ProfileCard() {
  const [user, setUser] = useState(null);

  const [curUser, setCurUser] = useState(null);

  const [earnings, setEarnings] = useState(0);

  const [popoverOpen, setPopoverOpen] = useState(false);

  function handleSellItemButtonClick(event) {
    setPopoverOpen(true);
  }

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

  useEffect(() => {
    const fetchEarnings = async () => {
      
        const response = await fetch(
          `http://localhost:9000/profile/earnings/${curUser}`
        );
        const data = await response.json();
        if (response.ok) {
          setEarnings(data.earnings);
        } else {
          console.error("Error fetching earnings:", data);
        }
      
    };
    if (curUser) {
      fetchEarnings();
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
            Earnings: ${earnings}
          </Typography>
          
          <Button
            size="medium"
            onClick={(event) => {
              handleSellItemButtonClick(event);
            }}
          >
            <SellIcon
              fontSize="large"
              style={{ color: "var(--dark-lilac)", marginRight: "10px" }}
            />
            List an Item
          </Button>
          <SellItem popoverOpen={popoverOpen} setPopoverOpen={setPopoverOpen} />
        
          
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfileCard;

