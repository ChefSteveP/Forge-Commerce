import React, { useEffect, useState } from "react";
import "../postBoardPage/PostBoardPage.css";
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
import axios from "axios";
import EditablePostCardPopover from "./EditablePostCardPopover";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditablePostCard({ data, index, addToCart }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [itemOwner, setItemOwner] = useState("");

  function handleViewInfoButtonClick(event, index) {
    setPopoverAnchorEl(index);
    setPopoverOpen(true);
  }
  console.log(data);

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
            <div style={{ display: "flex" }}>
              <Button
                size="medium"
                onClick={(event) => handleViewInfoButtonClick(event, index)}
                style={{ color: "white" }}
              >
                <EditIcon
                  fontSize="large"
                  style={{ color: "var(--custom-white)", marginRight: "5px" }}
                />
              </Button>
              <Button
                size="medium"
                // onClick={(event) => handleViewInfoButtonClick(event, index)}
                style={{ color: "white" }}
              >
                <DeleteIcon
                  fontSize="large"
                  style={{ color: "var(--custom-white)", marginRight: "5px" }}
                />
              </Button>
            </div>

            <EditablePostCardPopover
              data={data}
              index={index}
              popoverOpen={popoverOpen}
              setPopoverOpen={setPopoverOpen}
              popoverAnchorEl={popoverAnchorEl}
              itemOwner={itemOwner}
              addToCart={addToCart}
            />
            {/* <Button
              size="medium"
              // onClick={() => {
              //   addToCart(data.id);
              // }}
            >
              <EditIcon
                fontSize="large"
                style={{ color: "var(--custom-white)" }}
              />
            </Button> */}
          </CardActions>
        </Card>
      </Card>
    </Grid>
  );
}
