import React from 'react';
import { Container, Box } from "@mui/material";
import ProfileCard from './ProfileCard';
import MyListings from './MyListings';

const ProfilePage = () => {
    return (
        <Container maxWidth="lg">
          <h1>Profile Page</h1>
            <Box my={4}>
                <ProfileCard />
            </Box>
            <Box my={4}>
                <MyListings />
            </Box> 
        </Container>
    );
}

export default ProfilePage;
