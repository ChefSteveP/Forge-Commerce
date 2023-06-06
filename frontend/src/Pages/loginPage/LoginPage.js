import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useUserState } from "../../Components/userState";

export default function LoginPage() {
  const [signUp, setSignUp] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [user, setUser] = useUserState();

  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUser({ email: data.get("email"), password: data.get("password") });
  };
  console.log(user);

  const handleLinkClick = (event) => {
    setSignUp(true);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setNewUser({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });
    setSignUp(false);
  };
  console.log(newUser);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {signUp === false ? (
        <SignIn handleLinkClick={handleLinkClick} handleSignIn={handleSignIn} />
      ) : (
        <SignUp handleSignUp={handleSignUp} />
      )}
    </Grid>
  );
}
