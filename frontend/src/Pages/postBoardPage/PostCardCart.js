import React, { useState, useEffect } from "react";
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
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import axios from "axios";

import PostCardPopover from "./PostCardPopover";
import PostCardCartPopover from "./PostCardCartPopover";

export default function PostCardCart({ data, index, removeFromCart }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [itemOwner, setItemOwner] = useState("");

  function handleViewInfoButtonClick(event, index) {
    setPopoverAnchorEl(index);
    setPopoverOpen(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/profile/user/${data.listedby}`
        );
        setItemOwner(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    if (data.listedby) fetchData();
  }, [data]);

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
              itemOwner={itemOwner}
            />
            <Button
              size="medium"
              onClick={() => {
                removeFromCart(data.id);
              }}
            >
              <BookmarkRemoveIcon
                fontSize="large"
                style={{ color: "var(--custom-white)" }}
              />
            </Button>
          </CardActions>
          {data.isSold ? (
            <h2
              style={{
                backgroundColor: "white",
                color: "red",
                padding: "5px",
                borderRadius: "5px",
              }}
              className="sold-tag"
            >
              Sold
            </h2>
          ) : null}
        </Card>
      </Card>
    </Grid>
  );
}
