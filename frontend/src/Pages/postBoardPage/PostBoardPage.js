import React, { useEffect, useState, useContext } from "react";
import "./PostBoardPage.css";
import Header from "./Header";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import PostCard from "./PostCard";
import { AppStateContext } from "../../Components/appState.js";

export default function PostBoardPage() {
  const [info, setInfo] = useState();
  const [search, setSearch] = useState("");
  const [filteredInfo, setFilteredInfo] = useState();

  const { appState, setAppState } = useContext(AppStateContext);
  let email = appState.user;
  if (!appState.user) {
    email = localStorage.getItem("email");
  }

  let user = "Jacob Wald";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/postBoard/${user}`
        );
        setInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  console.log(email);

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
