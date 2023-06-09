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
import backgroundImage from "../loginPage/image.jpg";

export default function LoginPage() {
  const [signUp, setSignUp] = useState(false);
  const [isError, setIsError] = useState();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Set the persistence option and continue with sign-in
        return signInWithEmailAndPassword(
          auth,
          data.get("email"),
          data.get("password")
        );
      })
      .then(() => {
        setIsError(false);
      })
      .then(() => {
        navigate(RouteLocations.postBoard);
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  const handleLinkClick = (event) => {
    setSignUp(true);
    setIsError(false);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    createUserWithEmailAndPassword(
      auth,
      data.get("email"),
      data.get("password")
    )
      .then((userCredential) => {
        const user = userCredential.user;

        const newUser = {
          name: data.get("firstName") + data.get("lastName"),
          email: data.get("email"),
          uid: user.uid,
        };

        axios.post("https://forge-commerce.onrender.com/login", newUser);
        setPopoverOpen(true);
      })
      .catch((error) => {
        setIsError(true);
      });
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
          backgroundImage: `url(${backgroundImage})`,
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
        <SignIn
          handleLinkClick={handleLinkClick}
          handleSignIn={handleSignIn}
          isError={isError}
        />
      ) : (
        <SignUp
          handleSignUp={handleSignUp}
          isError={isError}
          setSignUp={setSignUp}
          setIsError={setIsError}
          popoverOpen={popoverOpen}
          setPopoverOpen={setPopoverOpen}
        />
      )}
    </Grid>
  );
}
