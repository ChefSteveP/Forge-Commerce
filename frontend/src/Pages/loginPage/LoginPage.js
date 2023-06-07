import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useState, useContext, useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
// import { useCurrentUserState } from "../../Components/appState";
import { auth } from "../../app/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RouteLocations } from "../../app/RouteLocations";
import { AppStateContext } from "../../Components/appState.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const { appState, setAppState } = useContext(AppStateContext);

  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      user: email,
    }));
    localStorage.setItem("email", email);
    if (email) {
      navigate(RouteLocations.postBoard);
    }
  }, [email]);

  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    signInWithEmailAndPassword(
      auth,
      data.get("email"),
      data.get("password")
    ).then((userCredential) => {
      const user = userCredential.user;
      setEmail(user.email);
      // navigate(RouteLocations.postBoard);
    });
  };

  console.log(email);

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
