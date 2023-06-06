import React, { useState } from "react";
import { Typography, TextField, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  const [search, setSearch] = useState("");
  function handleSearch(event) {}
  return (
    <div>
      <div>
        <Typography variant="h2" gutterBottom>
          Post Board
        </Typography>
      </div>
      <Grid
        container
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
        }}
        spacing={2}
      >
        <Grid item>
          <SearchIcon></SearchIcon>
        </Grid>
        <Grid item>
          <TextField
            value={search}
            placeholder="Find user"
            onChange={(event) => handleSearch(event)}
          ></TextField>
        </Grid>
      </Grid>
    </div>
  );
}
