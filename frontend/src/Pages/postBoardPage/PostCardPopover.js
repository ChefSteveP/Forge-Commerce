import {
  CardContent,
  Container,
  Grid,
  Popover,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import React from "react";
import "./PostBoardPage.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

export default function PostCardPopover({
  data,
  index,
  popoverOpen,
  setPopoverOpen,
  popoverAnchorEl,
  itemOwner,
  addToCart,
}) {
  function handlePopoverClose() {
    setPopoverOpen(false);
  }

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
        maxWidth="sm"
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
              <Grid container justifyContent="center" alignItems="center">
                <Typography className="textColor" variant="subtitle1">
                  {data.name}
                </Typography>

                <Grid container justifyContent="center" alignItems="center">
                  <Typography className="textColor" variant="subtitle1">
                    {data.description}
                  </Typography>
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
                      Listed By
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <Typography className="infoTextColor" variant="body2">
                      {itemOwner}
                    </Typography>
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
                      Name
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <Typography className="infoTextColor" variant="body2">
                      {data.name}
                    </Typography>
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
                    <Typography className="infoTextColor" variant="body2">
                      ${data.price}
                    </Typography>
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
                    <Typography className="infoTextColor" variant="body2">
                      {data.state}
                    </Typography>
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
                    <Typography className="infoTextColor" variant="body2">
                      {data.condition}
                    </Typography>
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
                      Saved By
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <Typography className="infoTextColor" variant="body2">
                      {data.amountSaved}
                    </Typography>
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
                      addToCart(data.id);
                    }}
                  >
                    <AddShoppingCartIcon
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
