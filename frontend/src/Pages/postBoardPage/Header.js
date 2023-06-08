import React, { useState } from "react";
import { Typography, TextField, Grid, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SellItem from "../../Components/sellItem";
import SellIcon from "@mui/icons-material/Sell";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterItems from "./FilterItems";

export default function Header({ search, handleSearch, setFilters }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [secondPopoverOpen, setSecondPopoverOpen] = useState(false);

  function handleSellItemButtonClick(event) {
    setPopoverOpen(true);
  }

  function handleFilterItemsButtonClick(event) {
    setSecondPopoverOpen(true);
  }

  return (
    <div>
      <div>
        <Typography
          variant="h2"
          gutterBottom
          className="page-title"
          style={{ marginLeft: "0px" }}
        >
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
              handleFilterItemsButtonClick(event);
            }}
          >
            <FilterAltIcon
              fontSize="large"
              style={{ color: "var(--dark-lilac)" }}
            />
            Filter Items
          </Button>
          <FilterItems
            secondPopoverOpen={secondPopoverOpen}
            setSecondPopoverOpen={setSecondPopoverOpen}
            setFilters={setFilters}
          />
        </Grid>
        <Grid item>
          <Button
            size="medium"
            onClick={(event) => {
              handleSellItemButtonClick(event);
            }}
          >
            <SellIcon
              fontSize="large"
              style={{ color: "var(--dark-lilac)", marginRight: "10px" }}
            />
            List an Item
          </Button>
          <SellItem popoverOpen={popoverOpen} setPopoverOpen={setPopoverOpen} />
        </Grid>
      </Grid>
    </div>
  );
}
