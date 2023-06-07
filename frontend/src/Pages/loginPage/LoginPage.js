import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { auth } from "../../app/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RouteLocations } from "../../app/RouteLocations";

export default function LoginPage() {
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Set the persistence option and continue with sign-in
        signInWithEmailAndPassword(
          auth,
          data.get("email"),
          data.get("password")
        );
        navigate(RouteLocations.postBoard);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLinkClick = (event) => {
    setSignUp(true);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    createUserWithEmailAndPassword(
      auth,
      data.get("email"),
      data.get("password")
    ).then((userCredential) => {
      const user = userCredential.user;

      const newUser = {
        name: data.get("firstName") + data.get("lastName"),
        email: data.get("email"),
        uid: user.uid,
      };

      axios.post("http://localhost:9000/login", newUser);
    });
    setSignUp(false);
  };

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
