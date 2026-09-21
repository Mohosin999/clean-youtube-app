import { useState } from "react";
import PropTypes from "prop-types";
import { fetchYouTubePlaylist } from "../../../api-searchPlaylist";
import { Box, TextField, IconButton, Typography, Chip, Stack, CircularProgress } from "@mui/material";
import { Search, ContentCopy, Check, OpenInNew } from "@mui/icons-material";

const SearchPlaylist = ({ onApply }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const playlistLink = await fetchYouTubePlaylist(prompt);
      setResponse(playlistLink);
      setPrompt("");
    } catch (error) {
      setResponse("Error fetching playlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Clean premium search — no AI branding */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "#09090B",
          border: "1px solid #27272A",
          borderRadius: "10px",
          p: 0.6,
          pl: 1.4,
          transition: "border-color 0.15s",
          "&:focus-within": { borderColor: "#3F3F46" },
        }}
      >
        <Search sx={{ color: "#71717A", fontSize: 18, flexShrink: 0 }} />
        <TextField
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Search playlists…"
          variant="standard"
          InputProps={{ disableUnderline: true, style: { color: "#FAFAFA", fontSize: "0.875rem" } }}
          sx={{ flexGrow: 1, "& .MuiInputBase-root": { color: "#FAFAFA" }, "& input::placeholder": { color: "#52525B", opacity: 1 } }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAsk();
            }
          }}
        />
        <IconButton
          onClick={handleAsk}
          disabled={loading || !prompt.trim()}
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "#18181B",
            border: "1px solid #27272A",
            color: "#FAFAFA",
            "&:hover": { bgcolor: "#27272A", borderColor: "#3F3F46" },
            "&:disabled": { bgcolor: "#111113", color: "#52525B", borderColor: "#18181B" },
            flexShrink: 0,
          }}
        >
          {loading ? <CircularProgress size={14} sx={{ color: "#A1A1AA" }} /> : <Search sx={{ fontSize: 16 }} />}
        </IconButton>
      </Box>
      <Typography sx={{ fontSize: "0.72rem", color: "#52525B", mt: 0.8 }}>Type a topic and press Enter</Typography>

      {response && response !== "Error fetching playlist." && !response.startsWith("No playlist") && (
        <Box sx={{ mt: 1.5, p: 1.4, borderRadius: "10px", bgcolor: "#111113", border: "1px solid #27272A", display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: "0.68rem", color: "#71717A", fontWeight: 700, letterSpacing: "0.06em", mb: 0.3 }}>FOUND</Typography>
            <Box component="a" href={response} target="_blank" rel="noreferrer" sx={{ color: "#FAFAFA", fontSize: "0.82rem", wordBreak: "break-all", textDecoration: "none", "&:hover": { textDecoration: "underline" }, display: "flex", alignItems: "center", gap: 0.6 }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{response}</span>
              <OpenInNew sx={{ fontSize: 12, flexShrink: 0, color: "#71717A" }} />
            </Box>
          </Box>
          <Stack direction="row" spacing={0.6}>
            <Chip
              icon={copied ? <Check sx={{ fontSize: 12 }} /> : <ContentCopy sx={{ fontSize: 12 }} />}
              label={copied ? "Copied" : "Copy"}
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(response);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              sx={{ bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA", fontWeight: 600, fontSize: "0.72rem", height: 28, cursor: "pointer" }}
            />
            <Chip
              label="Use"
              size="small"
              onClick={() => onApply(response)}
              sx={{ bgcolor: "#fff", color: "#09090B", fontWeight: 700, fontSize: "0.72rem", height: 28, cursor: "pointer", "&:hover": { bgcolor: "#E4E4E7" } }}
            />
          </Stack>
        </Box>
      )}

      {(response === "Error fetching playlist." || response.startsWith("No playlist")) && (
        <Typography sx={{ mt: 1.2, color: "#A1A1AA", fontSize: "0.8rem", p: 1.2, bgcolor: "#111113", borderRadius: "8px", border: "1px solid #27272A" }}>
          {response === "Error fetching playlist." ? "Something went wrong. Try again." : response}
        </Typography>
      )}
    </Box>
  );
};

SearchPlaylist.propTypes = {
  onApply: PropTypes.func,
};

export default SearchPlaylist;
