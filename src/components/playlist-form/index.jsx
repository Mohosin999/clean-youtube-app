import { useState } from "react";
import PropTypes from "prop-types";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Typography, Button, TextField, Dialog, DialogContent, Stack, Divider, Tabs, Tab } from "@mui/material";
import { Link as LinkIcon, Close, VideoLibrary, SmartDisplay } from "@mui/icons-material";
import useSnackbar from "../../hooks/useSnackbar";
import SearchPlaylist from "../shared/search-playlist";

const extractPlaylistId = (input) => input.match(/(?:list=)([\w-]+)/)?.[1] || input.trim();
const extractVideoId = (input) => {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m) return m[1];
  }
  const m2 = trimmed.match(/([\w-]{11})/);
  return m2 ? m2[1] : trimmed;
};

const PlaylistForm = ({ open, handleClose }) => {
  const [tab, setTab] = useState(0);
  const [state, setState] = useState("");
  const [isError, setIsError] = useState(false);
  const { handleSnackbar, SnackbarComponent } = useSnackbar();
  const { getPlaylist } = useStoreActions((a) => a.playlists);
  const { getVideo } = useStoreActions((a) => a.videos);
  const { data: playlistData } = useStoreState((s) => s.playlists);
  const { data: videoData } = useStoreState((s) => s.videos);
  const isPlaylist = tab === 0;

  const handleSubmit = async () => {
    if (!state.trim()) {
      setIsError(true);
      handleSnackbar("Please paste a link or ID", "error");
      return;
    }
    try {
      setIsError(false);
      if (isPlaylist) {
        const playlistId = extractPlaylistId(state);
        if (playlistData[playlistId]) { handleSnackbar("Playlist already added!", "warning"); return; }
        const result = await getPlaylist(playlistId);
        if (!result) { handleSnackbar("Failed to add playlist. Check the link/ID.", "error"); return; }
        handleSnackbar("Playlist added ✓", "success");
      } else {
        const videoId = extractVideoId(state);
        if (videoData[videoId]) { handleSnackbar("Video already added!", "warning"); return; }
        const result = await getVideo(videoId);
        if (!result) { handleSnackbar("Failed to add video. Check the link/ID.", "error"); return; }
        handleSnackbar("Video added ✓", "success");
      }
      setState(""); handleClose();
    } catch { handleSnackbar("Failed to add. Please check the link.", "error"); }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: "#09090B", border: "1px solid #27272A", borderRadius: "16px", overflow: "hidden", m: 2 } }}>
        {/* Clean header — no gray card */}
        <Box sx={{ px: 3, pt: 3, pb: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.01em", flex: 1 }}>Add to library</Typography>
            <Box onClick={handleClose} sx={{ width: 28, height: 28, borderRadius: "8px", display: "grid", placeItems: "center", cursor: "pointer", color: "#71717A", "&:hover": { color: "#fff", bgcolor: "#18181B" } }}>
              <Close sx={{ fontSize: 18 }} />
            </Box>
          </Box>
          <Tabs value={tab} onChange={(_, v) => { setTab(v); setState(""); setIsError(false); }} sx={{ mt: 2, minHeight: 36, "& .MuiTabs-indicator": { bgcolor: "#fff", height: 2 }, "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: "0.875rem", minHeight: 36, py: 0.6, color: "#71717A", px: 2, "&.Mui-selected": { color: "#fff" } } }}>
            <Tab icon={<VideoLibrary sx={{ fontSize: 16 }} />} iconPosition="start" label="Playlist" />
            <Tab icon={<SmartDisplay sx={{ fontSize: 16 }} />} iconPosition="start" label="Single Video" />
          </Tabs>
        </Box>

        <DialogContent sx={{ px: 3, pt: 3, pb: 2.5, bgcolor: "#09090B" }}>
          {isPlaylist ? (
            <>
              {/* Search — flat, no extra card */}
              <Typography sx={{ fontWeight: 600, fontSize: "0.82rem", color: "#A1A1AA", mb: 1 }}>Search</Typography>
              <SearchPlaylist onApply={(link) => setState(link)} />

              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ my: 2.5 }}>
                <Divider sx={{ flex: 1, borderColor: "#18181B" }} />
                <Typography sx={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", color: "#52525B" }}>OR PASTE LINK</Typography>
                <Divider sx={{ flex: 1, borderColor: "#18181B" }} />
              </Stack>

              <TextField
                autoFocus
                placeholder="https://youtube.com/playlist?list=PL..."
                fullWidth
                error={isError}
                value={state}
                onChange={(e) => setState(e.target.value)}
                helperText={isError ? "Please enter a valid link or ID" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#111113", color: "#fff", fontSize: "0.875rem", "& fieldset": { borderColor: "#27272A" }, "&:hover fieldset": { borderColor: "#3F3F46" }, "&.Mui-focused fieldset": { borderColor: "#fff" } },
                  "& input::placeholder": { color: "#52525B" },
                  "& .MuiFormHelperText-root": { color: "#F87171", fontSize: "0.72rem" },
                }}
              />
            </>
          ) : (
            <>
              <TextField
                autoFocus
                placeholder="https://www.youtube.com/watch?v=..."
                fullWidth
                error={isError}
                value={state}
                onChange={(e) => setState(e.target.value)}
                helperText={isError ? "Please enter a valid video link or ID" : "Supports watch?v=, youtu.be/, shorts/"}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#111113", color: "#fff", fontSize: "0.875rem", "& fieldset": { borderColor: "#27272A" }, "&:hover fieldset": { borderColor: "#3F3F46" }, "&.Mui-focused fieldset": { borderColor: "#fff" } },
                  "& input::placeholder": { color: "#52525B" },
                  "& .MuiFormHelperText-root": { color: isError ? "#F87171" : "#71717A", fontSize: "0.72rem" },
                }}
              />
            </>
          )}

          <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button onClick={() => { handleClose(); setState(""); setIsError(false); }} sx={{ borderRadius: "8px", px: 2.5, textTransform: "none", fontWeight: 600, color: "#A1A1AA" }}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{ borderRadius: "8px", px: 3, textTransform: "none", fontWeight: 700, bgcolor: "#fff", color: "#09090B", "&:hover": { bgcolor: "#E4E4E7" } }}>
              Add {isPlaylist ? "Playlist" : "Video"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <SnackbarComponent />
    </>
  );
};

PlaylistForm.propTypes = { open: PropTypes.bool.isRequired, handleClose: PropTypes.func.isRequired };
export default PlaylistForm;
