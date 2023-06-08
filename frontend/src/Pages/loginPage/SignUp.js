import React from "react";

import {
  TextField,
  Grid,
  Button,
  Paper,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignUpPopover from "./SignUpPopover";

export default function SignUp({
  handleSignUp,
  isError,
  setSignUp,
  setIsError,
  popoverOpen,
  setPopoverOpen,
}) {
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "var(--dark-lilac)" }}>
          <LockOutlinedIcon sx={{ color: "var(--custom-white)" }} />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "var(--dark-lilac)" }}
        >
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <p style={{ color: "red" }}>
            {isError ? "Error logging in. Please try again." : null}
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "var(--dark-lilac)",
              "&:hover": { backgroundColor: "var(--dark-lilac)" },
            }}
          >
            Sign Up
          </Button>
          <SignUpPopover
            setSignUp={setSignUp}
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
            setIsError={setIsError}
          />
          <Button
            onClick={() => {
              setSignUp(false);
              setIsError(false);
            }}
            fullWidth
            variant="contained"
            sx={{
              mt: 0,
              mb: 2,
              backgroundColor: "var(--dark-lilac)",
              "&:hover": { backgroundColor: "var(--dark-lilac)" },
            }}
          >
            Go Back To Sign In
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
