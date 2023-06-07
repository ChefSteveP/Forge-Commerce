import React, { useState } from "react";
import { Typography, TextField, Grid, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SellItem from "../../Components/sellItem";
import SellIcon from "@mui/icons-material/Sell";

export default function Header({ search, handleSearch }) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  function handleSellItemButtonClick(event) {
    setPopoverOpen(true);
  }

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
            placeholder="Find listing"
            onChange={(event) => handleSearch(event)}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            size="medium"
            onClick={(event) => {
              handleSellItemButtonClick(event);
            }}
          >
            <SellIcon fontSize="large" style={{ color: "var(--dark-lilac)" }} />
          </Button>
          <SellItem popoverOpen={popoverOpen} setPopoverOpen={setPopoverOpen} />
        </Grid>
      </Grid>
    </div>
  );
}
