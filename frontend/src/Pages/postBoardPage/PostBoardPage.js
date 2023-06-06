import React, { useEffect, useState } from "react";
import "./PostBoardPage.css";
import Header from "./Header";
import { Container, Grid } from "@mui/material";
import Card from "./Card";
import axios from "axios";

export default function PostBoardPage() {
  const [info, setInfo] = useState();
  const [search, setSearch] = useState("");
  const [filteredInfo, setFilteredInfo] = useState();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get();
  //       } catch {}
  //     };
  //     fetchData();
  //   }, []);

  function handleSearch(event) {
    setSearch(event.target.value);
    console.log(search);
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
            {/* {search === ""
              ? info &&
                info.map((data, index) => <Card data={data} index={index} />)
              : filteredInfo.map((data, index) => (
                  <Card data={data} index={index} />
                ))} */}
          </Grid>
        </Container>
      </main>
    </>
  );
}
