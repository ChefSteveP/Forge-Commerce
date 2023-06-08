import { Button, Container, Popover, Typography } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";

export default function SignUpPopover({
  popoverOpen,
  setPopoverOpen,
  setSignUp,
  setIsError,
}) {
  const handleClose = () => {
    setSignUp(false);
    setPopoverOpen(false);
    setIsError(false);
  };

  return (
    <Popover
      open={popoverOpen}
      onClose={handleClose}
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          style={{ marginTop: "20px" }} // Add margin above the text
        >
          Check your email to verify your anonymous email for customer-client
          communication
        </Typography>
        <Button
          onClick={handleClose}
          style={{ marginTop: "20px" }} // Add margin below the button
        >
          <DoneIcon fontSize="large" style={{ color: "var(--custom-white)" }} />
        </Button>
      </Container>
    </Popover>
  );
}
