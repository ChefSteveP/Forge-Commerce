import {
  CardContent,
  Container,
  Grid,
  Popover,
  Backdrop,
  CardMedia,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "../postBoardPage/PostBoardPage.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

export default function SoldEditablePostCardPopover({
  data,
  index,
  popoverOpen,
  setPopoverOpen,
  popoverAnchorEl,
}) {
  function handlePopoverClose() {
    setPopoverOpen(false);
  }

  const [price, setPrice] = useState(data.price);

  const editListing = () => {
    // Put request to edit listing
    axios
      .put(`https://forge-commerce.onrender.com/profile/${data.id}`, {
        price: Number(price),
      })
      .then(window.location.reload())
      .catch((err) => console.error(err));
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={popoverOpen}
    >
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
            minWidth: "300px",
          }}
        >
          <CardContent align="center">
            <Grid container spacing={2} direction="column" alignItems="center">
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
              <Grid item>
                <Grid className="infoContainer" direction="column" spacing={1}>
                  <Grid
                    className="infoItem"
                    item
                    container
                    justifyContent="space-between"
                  >
                    <Grid item style={{ marginLeft: "auto" }}>
                      <TextField
                        type="number"
                        defaultValue={data.price}
                        label="Price"
                        variant="outlined"
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ width: "250px" }}
                      />
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
    </Backdrop>
  );
}
