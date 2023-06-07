import React from 'react';
import { Container, Box } from "@mui/material";
import ProfileCard from './ProfileCard';
import UserListing from './UserListing';

const ProfilePage = () => {
    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <ProfileCard />
            </Box>
            <Box my={4}>
                <UserListing />
            </Box>
        </Container>
    );
}

export default ProfilePage;
