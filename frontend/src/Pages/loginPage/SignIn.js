import React from "react";

import {
  TextField,
  Grid,
  Button,
  Paper,
  Box,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      E-Commerce {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn({ handleLinkClick, handleSignIn, isError }) {
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
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <p style={{ color: "red" }}>
            {isError ? "Error logging in. Please try again." : null}
          </p>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                sx={{
                  color: "var(--dark-lilac)",
                  "&.Mui-checked": {
                    color: "var(--dark-lilac)",
                  },
                }}
              />
            }
            label="Remember me"
            sx={{ color: "var(--dark-lilac)" }}
          />
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
            Sign In
          </Button>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{ color: "var(--dark-lilac)" }}
                onClick={handleLinkClick}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
}
