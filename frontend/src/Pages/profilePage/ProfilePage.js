import React from "react";
import { Container, Box } from "@mui/material";
import ProfileCard from "./ProfileCard";
import MyListings from "./MyListings";
import Navbar from "../../Components/Navbar.js";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="item-container">
        <h1 className="page-title">Profile Page</h1>
        <div className="profile-container">
          <ProfileCard />
          <MyListings />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;