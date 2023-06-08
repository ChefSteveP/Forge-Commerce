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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import SoldEditablePostCardPopover from "./SoldEditablePostCardPopover";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from '@mui/icons-material/Undo';

export default function SoldPostCard({ data, index, addToCart }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [itemOwner, setItemOwner] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleViewInfoButtonClick(event, index) {
    setPopoverAnchorEl(index);
    setPopoverOpen(true);
  }
  console.log(data);

    // Unsell function
  const unsellItem = async () => {
    try {
      await axios.put(`http://localhost:9000/profile/unsell/${data.id}`);
      console.log('Item unsold');
      // Add any state updates or additional actions here.
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleDeleteButton = () => {
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    // Perform the action on confirmation
    setDeleteOpen(false);
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
  };


  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className="postBoardCard" style={{ backgroundColor: "lightgray" }}>
        <div className="cardMediaContainer">
          <CardMedia className="cardMedia" image={data.imageUrl} />
        </div>
        <Card
          className="cardContentContainer"
          style={{ backgroundColor: "gray" }}
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
          <CardActions className="cardActions">
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
              onClick={handleDeleteButton}
              style={{ color: "white" }}
            >
              <DeleteIcon
                fontSize="large"
                style={{ color: "var(--custom-white)", marginRight: "5px" }}
              />
            </Button>

            <Button onClick={unsellItem} size="medium" style={{ color: "white" }}>
            <UndoIcon
              fontSize="large"
              style={{ color: "var(--custom-white)", marginRight: "5px" }}
            />
          </Button>
         


          <Dialog open={deleteOpen} onClose={cancelDelete}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this item?</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={confirmDelete}
                variant="contained"
                color="primary"
              >
                Confirm
              </Button>
              <Button onClick={cancelDelete} variant="outlined" color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <SoldEditablePostCardPopover
              data={data}
              index={index}
              popoverOpen={popoverOpen}
              setPopoverOpen={setPopoverOpen}
              popoverAnchorEl={popoverAnchorEl}
              itemOwner={itemOwner}
              addToCart={addToCart}
            />
          </CardActions>
        </Card>

      </Card>

    </Grid>

  );
}
