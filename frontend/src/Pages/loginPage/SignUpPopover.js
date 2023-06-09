import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React from "react";

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
    <>
      <Dialog open={popoverOpen} onClose={handleClose}>
        <DialogTitle>Important Notice</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontWeight: "bold" }}>
            Very your email address for anonymous customer-client interaction.
            [NOTE]: You will NOT be able to be contacted by buyers if you do not
            verify your email.
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "var(--dark-lilac)" }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
