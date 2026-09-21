import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

const VideoCardItem = ({ title, thumbnails, videoId, videos, playlistId }) => {
  const videoIndex = videos.indexOf(videoId);
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: "12px", overflow: "hidden", bgcolor: "#111113", border: "1px solid #27272A", "&:hover": { borderColor: "#3F3F46" }, transition: "border-color 0.2s" }}>
      <Box component={Link} to={`/player/${playlistId}/${videoIndex}?videoId=${videoId}`} sx={{ position: "relative", display: "block", paddingTop: "56.25%", overflow: "hidden", bgcolor: "#09090B", textDecoration: "none" }}>
        <Box component="img" src={thumbnails?.url} alt={title} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <Box sx={{ position: "absolute", bottom: 8, right: 8, px: 0.8, py: 0.2, borderRadius: "6px", bgcolor: "rgba(0,0,0,0.75)", color: "#fff", fontSize: "0.65rem", fontWeight: 700 }}>HD</Box>
        <Box sx={{ position: "absolute", top: 8, left: 8, px: 0.8, py: 0.25, borderRadius: "6px", bgcolor: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff", fontSize: "0.62rem", fontWeight: 700 }}>#{videoIndex + 1}</Box>
      </Box>
      <Box sx={{ p: 1.6, flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.45em" }}>{title}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto", pt: 0.5 }}>
          <Typography sx={{ color: "#71717A", fontSize: "0.72rem" }}>Lesson {videoIndex + 1}</Typography>
          <Box component={Link} to={`/player/${playlistId}/${videoIndex}?videoId=${videoId}`} sx={{ display: "inline-flex", alignItems: "center", gap: 0.4, color: "#FAFAFA", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", "&:hover": { color: "#A1A1AA" } }}>
            Play <PlayArrow sx={{ fontSize: 14 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

VideoCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnails: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  videoId: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
  playlistId: PropTypes.string.isRequired,
};

export default VideoCardItem;
