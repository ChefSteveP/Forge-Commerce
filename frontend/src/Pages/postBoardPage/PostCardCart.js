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
          `https://forge-commerce.onrender.com/profile/user/${data.listedby}`
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
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--dark-lilac)",
          }}
        >
          <CardContent
            style={{
              paddingTop: "16px",
              paddingBottom: "0px",
              textAlign: "center",
            }}
          >
            <Typography
              className="textColor"
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontWeight: "bold" }}
            >
              {data?.name}
            </Typography>
          </CardContent>
          <Typography className="textColor" variant="h5">
            ${data?.price}
          </Typography>

          <CardActions>
            <Button
              size="medium"
              onClick={(event) => handleViewInfoButtonClick(event, index)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
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
            <Button
              disabled
              variant="filled"
              style={{
                backgroundColor: "white",
                marginBottom: "10px",
                color: "red",
                fontWeight: "bold",
              }}
            >
              Sold
            </Button>
          ) : (
            <Button
              variant="filled"
              style={{
                backgroundColor: "white",
                marginBottom: "10px",
              }}
              onClick={() => {
                window.location.href = `mailto:${data.aliasEmail}?subject=${data.name} Inquiry&body=Hi, I am interested in your item.`;
              }}
            >
              Contact Seller
            </Button>
          )}
        </Card>
      </Card>
    </Grid>
  );
}
