import {
  CardContent,
  Container,
  Grid,
  Popover,
  Typography,
  CardMedia,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import "../postBoardPage/PostBoardPage.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

export default function EditablePostCardPopover({
  data,
  index,
  popoverOpen,
  setPopoverOpen,
  popoverAnchorEl,
  removeFromCart,
}) {
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

  function handlePopoverClose() {
    setPopoverOpen(false);
  }

  const [name, setName] = useState(data.name);
  const [condition, setCondition] = useState(data.condition);
  const [description, setDescription] = useState(data.description);
  const [price, setPrice] = useState(data.price);
  const [state, setState] = useState(data.state);

  const editListing = () => {
    // Put request to edit listing
    axios
      .put(`http://localhost:9000/profile/${data.id}`, {
        name: name,
        condition: condition,
        description: description,
        price: Number(price),
        state: state,
      })
      .then(window.location.reload())
      .catch((err) => console.error(err));
  };

  return (
    <Popover
      open={popoverOpen && popoverAnchorEl === index}
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
          backgroundColor: "var(--light-lilac)",
          padding: "0px",
        }}
      >
        <CardContent align="center">
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <CardMedia
                    className="profileImage"
                    image={data.imageUrl}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                className="infoContainer"
                direction="column"
                spacing={1}
              >
                <Grid
                  className="infoItem"
                  item
                  container
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography className="infoTextColor" variant="body2">
                      Name
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <TextField
                      defaultValue={data.name}
                      label="Item Name"
                      variant="outlined"
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: "200px" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  className="infoItem"
                  item
                  container
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography className="infoTextColor" variant="body2">
                      Description
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <TextField
                      defaultValue={data.description}
                      label="Item Description"
                      variant="outlined"
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ width: "200px" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  className="infoItem"
                  item
                  container
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography className="infoTextColor" variant="body2">
                      Price
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <TextField
                      type="number"
                      defaultValue={data.price}
                      label="Price"
                      variant="outlined"
                      onChange={(e) => setPrice(e.target.value)}
                      style={{ width: "200px" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  className="infoItem"
                  item
                  container
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography className="infoTextColor" variant="body2">
                      Condition
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <Select
                      label="Condition"
                      value={condition}
                      displayEmpty
                      onChange={(e) => setCondition(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                      inputProps={{
                        style: {
                          // color: "var(--custom-white)",
                          borderColor: "var(--custom-white)",
                        },
                      }}
                      style={{
                        // color: "var(--custom-white)",
                        borderColor: "var(--custom-white)",
                        width: "200px",
                        marginLeft: "30px",
                        textAlign: "left",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Condition
                      </MenuItem>
                      <MenuItem value="well-worn">Well Worn</MenuItem>
                      <MenuItem value="minimal-use">Minimal Use</MenuItem>
                      <MenuItem value="brand-new">Brand New</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Grid
                  className="infoItem"
                  item
                  container
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography className="infoTextColor" variant="body2">
                      State
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <Select
                      label="State"
                      value={state}
                      displayEmpty
                      onChange={(e) => setState(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                      inputProps={{
                        style: {
                          // color: "var(--custom-white)",
                          borderColor: "var(--custom-white)",
                        },
                      }}
                      style={{
                        // color: "var(--custom-white)",
                        borderColor: "var(--custom-white)",
                        width: "200px",
                        textAlign: "left",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select State
                      </MenuItem>
                      {states.map((stateName) => (
                        <MenuItem key={stateName} value={stateName}>
                          {stateName}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                className="infoContainer"
                direction="row"
                justifyContent={"center"}
                spacing={4}
              >
                <Grid item>
                  <Button
                    size="medium"
                    onClick={() => {
                      editListing();
                    }}
                  >
                    <CheckIcon
                      fontSize="large"
                      style={{ color: "var(--custom-white)" }}
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="medium" onClick={() => handlePopoverClose()}>
                    {" "}
                    <CloseIcon
                      fontSize="large"
                      style={{ color: "var(--custom-white)" }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Container>
    </Popover>
  );
}
