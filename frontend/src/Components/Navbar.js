import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled, useTheme, ThemeProvider } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Stack from "@mui/material/Stack";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LoginIcon from "@mui/icons-material/Login";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../theme";
import logo from "../assets/logo1.png";
import { RouteLocations } from "../app/RouteLocations";
import { auth } from "../app/firebase";
import { useNavigate } from "react-router-dom";

const NavigationLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ButtonWithBar = styled(IconButton)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  "&:active": {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const themeUsed = useTheme();
  const matches = useMediaQuery(themeUsed.breakpoints.up("sm"));

  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate(RouteLocations.login);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Stack spacing={2} sx={{ width: 150, padding: 4 }}>
      <NavigationLink to={RouteLocations.postBoard}>
        <StoreIcon />
        <Typography variant="body2">Shop</Typography>
      </NavigationLink>

      <NavigationLink to={RouteLocations.cart}>
        <BookmarkIcon />
        <Typography variant="body2">Saved</Typography>
      </NavigationLink>
      <NavigationLink to={RouteLocations.profile}>
        <PersonIcon />
        <Typography variant="body2">Profile</Typography>
      </NavigationLink>
      <NavigationLink onClick={() => logout()}>
        <LoginIcon />
        <Typography variant="body2">Logout</Typography>
      </NavigationLink>
    </Stack>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            height="80"
            style={{ margin: "10px", marginLeft: "10px" }}
          />
          <div style={{ flexGrow: 1 }} />
          {matches && (
            <>
              <ButtonWithBar
                component={RouterLink}
                to={RouteLocations.postBoard}
              >
                <StoreIcon />
                <Typography variant="body2">Shop</Typography>
              </ButtonWithBar>

              <ButtonWithBar component={RouterLink} to={RouteLocations.cart}>
                <BookmarkIcon />
                <Typography variant="body2">Saved</Typography>
              </ButtonWithBar>

              <ButtonWithBar component={RouterLink} to={RouteLocations.profile}>
                <PersonIcon />
                <Typography variant="body2">Profile</Typography>
              </ButtonWithBar>

              <ButtonWithBar onClick={() => logout()}>
                <LoginIcon />
                <Typography variant="body2">Logout</Typography>
              </ButtonWithBar>
            </>
          )}
          {!matches && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
      >
        {drawer}
      </SwipeableDrawer>
    </ThemeProvider>
  );
};

export default Navbar;
