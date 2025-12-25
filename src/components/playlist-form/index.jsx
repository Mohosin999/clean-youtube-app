import { useState } from "react";
import PropTypes from "prop-types";
import { useStoreActions, useStoreState } from "easy-peasy";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useSnackbar from "../../hooks/useSnackbar";
import SearchPlaylist from "../shared/search-playlist";

/**
 * PlaylistForm component for adding a playlist by URL or ID.
 *
 * @param {boolean} open - Controls the open/close state of the dialog.
 * @param {Function} handleClose - Function to close the dialog.
 *
 * @returns {JSX.Element} The rendered PlaylistForm component.
 */
const PlaylistForm = ({ open, handleClose }) => {
  const [state, setState] = useState("");
  const [isError, setIsError] = useState(false);

  const { handleSnackbar, SnackbarComponent } = useSnackbar();

  const { getPlaylist } = useStoreActions((actions) => actions.playlists);
  const { data } = useStoreState((state) => state.playlists);

  /**
   * Handles the playlist form submission.
   * - Validates the input URL or ID.
   * - Fetches the playlist by ID.
   * - Shows appropriate feedback messages via Snackbar.
   */
  const handleSubmit = async () => {
    if (!state) {
      setIsError(true);
      handleSnackbar("Invalid Link or ID", "error");
      return;
    }

    const playlistId = state.match(/(?:list=)([\w-]+)/)?.[1] || state;

    if (data[playlistId]) {
      handleSnackbar("Playlist Already Exists!", "warning");
      return;
    }

    try {
      setIsError(false);

      const result = await getPlaylist(playlistId);

      if (!result) {
        handleSnackbar(
          "Failed to add playlist. Please check the ID or link.",
          "error"
        );
        return;
      }

      handleSnackbar("Playlist Added Successfully", "success");
      setState("");
      handleClose();
    } catch (error) {
      console.error("Error fetching playlist:", error);
      handleSnackbar(
        "Failed to add playlist. Please check the ID or link.",
        "error"
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#292929",
            marginLeft: { xs: 2, sm: 2, md: "auto" },
            marginRight: { xs: 2, sm: 2, md: "auto" },
          },
        }}
      >
        {/* Pass onApply here */}
        <DialogContent>
          <SearchPlaylist onApply={(link) => setState(link)} />
        </DialogContent>

        <DialogTitle
          sx={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          Add Playlist
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#B4B2B0" }}>
            To add a playlist, please input the playlist link or ID. Otherwise,
            we cannot fetch the playlist.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Playlist Link or ID"
            fullWidth
            error={isError}
            variant="standard"
            onChange={(e) => setState(e.target.value)}
            value={state}
            InputLabelProps={{
              style: { color: "#B4B2B0" },
            }}
            sx={{
              backgroundColor: "#424242",
              input: { color: "#FFFFFF" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setState("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Playlist</Button>
        </DialogActions>
      </Dialog>

      <SnackbarComponent />
    </>
  );
};

// PropTypes validation
PlaylistForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PlaylistForm;
