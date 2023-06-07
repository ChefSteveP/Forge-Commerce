import React from "react";
import { Container, Box } from "@mui/material";
import ProfileCard from "./ProfileCard";
import MyListings from "./MyListings";
import Navbar from "../../Components/Navbar.js";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="item-container">
        <h1>Profile Page</h1>
        <ProfileCard />
        <MyListings />
        {/* <Box my={4}>
          <ProfileCard />
        </Box>
        <Box my={4}>
          <MyListings />
        </Box> */}
      </div>
    </>
  );
};

export default ProfilePage;
