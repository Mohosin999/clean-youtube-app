import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Custom hook to manage Snackbar notifications
const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // Function to close the Snackbar
  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  /**
   * Triggers the Snackbar to display a message with an optional severity.
   *
   * @param {string} message - The message to display in the Snackbar.
   * @param {string} [severity='success'] - The severity (type) of the Snackbar.
   */
  const handleSnackbar = (message, severity = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  // Renders the Snackbar component (ALWAYS TOP RIGHT)
  const SnackbarComponent = () => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 9999,
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    );
  };

  return { handleSnackbar, SnackbarComponent };
};

export default useSnackbar;
