import React from "react";
import ProfileCard from "./ProfileCard";
import MyListings from "./MyListings";
import Navbar from "../../Components/Navbar.js";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="profile-container" style={{ marginTop: "125px" }}>
        <h1 className="page-title" style={{ marginLeft: "0px" }}>
          Profile Page
        </h1>
        <ProfileCard />
        <MyListings />
      </div>
    </>
  );
};

export default ProfilePage;
