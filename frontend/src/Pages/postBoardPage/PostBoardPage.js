import React, { useEffect, useState } from "react";
import "./PostBoardPage.css";
import Header from "./Header";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import PostCard from "./PostCard";
import { auth } from "../../app/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export default function PostBoardPage() {
  const [info, setInfo] = useState();
  const [search, setSearch] = useState("");
  const [filteredInfo, setFilteredInfo] = useState();
  const [curUser, setCurUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setCurUser(user.email);
        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/postBoard/${curUser}`
        );
        setInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (curUser) fetchData();
  }, [curUser]);

  function handleSearch(event) {
    setSearch(event.target.value);
    setFilteredInfo(
      info.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  }

  return (
    <>
      <header className="postBoard__header">
        <Header
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
      </header>
      <main>
        <Container maxWidth="fullWidth">
          <Grid container className="cardGrid" spacing={3}>
            {search === ""
              ? info &&
                info.map((data, index) => (
                  <PostCard data={data} index={index} />
                ))
              : filteredInfo.map((data, index) => (
                  <PostCard data={data} index={index} />
                ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
