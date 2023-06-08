import {
  Container,
  Popover,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  InputBase,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../app/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export default function SellItem({ popoverOpen, setPopoverOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [curUser, setCurUser] = useState("");

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

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setCurUser(user.email);
        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleFormSubmit = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("name", name);
      formData.append("condition", condition);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("state", state);
      formData.append("listedby", curUser);
      formData.append("amountSaved", 0);
      try {
        await axios.post("http://localhost:9000/postBoard", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setName("");
        setCondition("");
        setDescription("");
        setPrice("");
        setState("");
        setSelectedImage(null);
        window.location.reload();
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  function handlePopoverClose() {
    setPopoverOpen(false);
  }

  return (
    <Popover
      open={popoverOpen}
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
        <TextField
          label="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            style: { color: "var(--custom-white)" },
          }}
          InputProps={{
            style: {
              color: "var(--custom-white)",
              borderColor: "var(--custom-white)",
            },
          }}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
          InputLabelProps={{
            style: { color: "var(--custom-white)" },
          }}
          InputProps={{
            style: {
              color: "var(--custom-white)",
              borderColor: "var(--custom-white)",
            },
          }}
        />
        <Grid container>
          <Grid item xs={12} sm={6}>
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
                  color: "var(--custom-white)",
                  borderColor: "var(--custom-white)",
                },
              }}
              style={{
                color: "var(--custom-white)",
                borderColor: "var(--custom-white)",
              }}
            >
              <MenuItem value="" disabled>
                Select Conditon
              </MenuItem>
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
              required
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
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              type="number"
              margin="normal"
              InputLabelProps={{
                style: { color: "var(--custom-white)" },
              }}
              InputProps={{
                style: {
                  color: "var(--custom-white)",
                  borderColor: "var(--custom-white)",
                },
              }}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            justifyContent="flex-end"
            padding="20px"
          >
            <InputBase
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              sx={{
                borderBottom: "none",
                "&:hover": {
                  borderBottom: "none",
                },
                "&:focus": {
                  borderBottom: "none",
                },
                "& input[type='file']::file-selector-button": {
                  backgroundColor: "var(--dark-lilac)",
                  color: "var(--custom-white)",
                  borderColor: "var(--dark-lilac)",
                },
              }}
              inputProps={{
                style: {
                  color: "var(--custom-white)",
                  borderColor: "var(--custom-white)",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                handleFormSubmit();
                setPopoverOpen(false);
              }}
              sx={{
                backgroundColor: "var(--dark-lilac)",
                "&:hover": { backgroundColor: "var(--dark-lilac)" },
                color: "var(--custom-white)",
              }}
            >
              List Item
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => setPopoverOpen(false)}
              sx={{
                backgroundColor: "var(--dark-lilac)",
                "&:hover": { backgroundColor: "var(--dark-lilac)" },
                color: "var(--custom-white)",
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Popover>
  );
}
