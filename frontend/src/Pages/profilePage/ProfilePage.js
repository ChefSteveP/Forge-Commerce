import React from "react";
import ProfileCard from "./ProfileCard";
import MyListings from "./MyListings";
import Navbar from "../../Components/Navbar.js";
import "./ProfilePage.css";
import { Typography } from "@mui/material";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="profile-container" style={{ marginTop: "125px" }}>
        <Typography
          variant="h2"
          fontWeight={"bold"}
          gutterBottom
          className="page-title"
          style={{ marginLeft: "0px" }}
        >
          Profile Page
        </Typography>
        <ProfileCard />
        <MyListings />
      </div>
    </>
  );
};

export default ProfilePage;
