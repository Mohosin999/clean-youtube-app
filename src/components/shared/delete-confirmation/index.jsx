import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const DeleteWithConfirm = ({ title, confirmTitle, message, onConfirm }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleConfirm = () => { onConfirm(); setOpen(false); };

  return (
    <>
      <Tooltip title={title} arrow>
        <IconButton onClick={() => setOpen(true)} size="small" sx={{ width: 28, height: 28, borderRadius: "8px", color: "#71717A", "&:hover": { bgcolor: "#18181B", color: "#F87171" } }}>
          <Delete sx={{ fontSize: 14 }} />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { bgcolor: "#111113", border: "1px solid #27272A", borderRadius: "12px", color: "#FAFAFA", m: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1rem", pb: 1 }}>{confirmTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#A1A1AA", fontSize: "0.875rem" }}>{message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700, color: "#A1A1AA" }}>Cancel</Button>
          <Button onClick={handleConfirm} sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700, bgcolor: "#DC2626", color: "#fff", px: 2.5, "&:hover": { bgcolor: "#B91C1C" } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteWithConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  confirmTitle: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteWithConfirm;
