import React, { useState } from "react";
import "./PostBoardPage.css";
import {
  Grid,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import PostCardPopover from "./PostCardPopover";
import PostCardCartPopover from "./PostCardCartPopover";

export default function PostCardCart({ data, index, removeFromCart }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  function handleViewInfoButtonClick(event, index) {
    setPopoverAnchorEl(index);
    setPopoverOpen(true);
  }
  console.log(data);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card
        className="postBoardCard"
        style={{ backgroundColor: "var(--light-lilac)" }}
      >
        <div className="cardMediaContainer">
          <CardMedia className="cardMedia" image={data.imageUrl} />
        </div>
        <Card
          className="cardContentContainer"
          style={{ backgroundColor: "var(--dark-lilac)" }}
        >
          <CardContent style={{ paddingTop: "16px", paddingBottom: "0px" }}>
            <Typography
              className="textColor"
              gutterBottom
              variant="h5"
              component="div"
            >
              {data?.name}
            </Typography>
            <Typography className="textColor" variant="body2">
              ${data?.price}
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              size="medium"
              onClick={(event) => handleViewInfoButtonClick(event, index)}
            >
              <InfoIcon
                fontSize="large"
                style={{ color: "var(--custom-white)" }}
              />
            </Button>
            <PostCardCartPopover
              data={data}
              index={index}
              popoverOpen={popoverOpen}
              setPopoverOpen={setPopoverOpen}
              popoverAnchorEl={popoverAnchorEl}
              removeFromCart={removeFromCart}
              // handleAddToCart={handleAddToCart}
            />
            <Button
              size="medium"
              onClick={() => {
                removeFromCart(data.id);
              }}
            >
              <RemoveShoppingCartIcon
                fontSize="large"
                style={{ color: "var(--custom-white)" }}
              />
            </Button>
          </CardActions>
        </Card>
      </Card>
    </Grid>
  );
}
