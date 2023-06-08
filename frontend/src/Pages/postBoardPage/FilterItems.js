import {
  Button,
  Container,
  Grid,
  MenuItem,
  Popover,
  Select,
} from "@mui/material";
import React, { useState } from "react";

export default function FilterItems({
  secondPopoverOpen,
  setSecondPopoverOpen,
  setFilters,
}) {
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");

  const initialCondition = "";
  const initialPrice = "";
  const initialState = "";

  function handlePopoverClose() {
    setSecondPopoverOpen(false);
  }

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  function handleFilter() {
    setFilters({
      condition: condition,
      state: state,
      priceSort: price,
    });
  }

  function handleReset() {
    setCondition(initialCondition);
    setPrice(initialPrice);
    setState(initialState);
    setFilters({
      condition: "",
      state: "",
      priceSort: "",
    });
  }

  return (
    <Popover
      open={secondPopoverOpen}
      onClose={handlePopoverClose}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Container
        maxWidth="fullWidth"
        style={{
          backgroundColor: "var(--dark-lilac)",
          padding: "20px",
        }}
      >
        <Grid container style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6}>
            <Select
              label="Condition"
              value={condition}
              displayEmpty
              onChange={(e) => setCondition(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{
                style: {
                  color: "var(--custom-white)",
                  borderColor: "var(--custom-white)",
                },
              }}
              style={{
                color: "var(--custom-white)",
                borderColor: "var(--custom-white)",
              }}
            >
              <MenuItem value="">Select Conditon</MenuItem>
              <MenuItem value="well-worn">Well Worn</MenuItem>
              <MenuItem value="minimal-use">Minimal Use</MenuItem>
              <MenuItem value="brand-new">Brand New</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label="State"
              value={state}
              displayEmpty
              onChange={(e) => setState(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{
                style: {
                  color: "var(--custom-white)",
                  borderColor: "var(--custom-white)",
                },
              }}
              style={{
                color: "var(--custom-white)",
                borderColor: "var(--custom-white)",
              }}
            >
              <MenuItem value="">Select State</MenuItem>
              {states.map((stateName) => (
                <MenuItem key={stateName} value={stateName}>
                  {stateName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          style={{ marginBottom: "20px" }}
        >
          <Grid item>
            <Select
              label="Price"
              value={price}
              displayEmpty
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{
                style: {
                  color: "var(--custom-white)",
                  borderColor: "var(--custom-white)",
                },
              }}
              style={{
                color: "var(--custom-white)",
                borderColor: "var(--custom-white)",
              }}
            >
              <MenuItem value="">Select Price Sort</MenuItem>
              <MenuItem value="price-ascending">Price Ascending</MenuItem>
              <MenuItem value="price-descending">Price Descending</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                handleFilter();
                setSecondPopoverOpen(false);
              }}
              sx={{
                backgroundColor: "var(--dark-lilac)",
                "&:hover": { backgroundColor: "var(--dark-lilac)" },
                color: "var(--custom-white)",
              }}
            >
              Apply Filters
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => setSecondPopoverOpen(false)}
              sx={{
                backgroundColor: "var(--dark-lilac)",
                "&:hover": { backgroundColor: "var(--dark-lilac)" },
                color: "var(--custom-white)",
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                handleReset();
                setSecondPopoverOpen(false);
              }}
              sx={{
                backgroundColor: "var(--dark-lilac)",
                "&:hover": { backgroundColor: "var(--dark-lilac)" },
                color: "var(--custom-white)",
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Popover>
  );
}
