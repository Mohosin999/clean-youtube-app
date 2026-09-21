import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import YouTube from "react-youtube";
import { Box, Container, Typography, Stack, Chip, IconButton, Tooltip } from "@mui/material";
import { ArrowBack, SmartDisplay, CheckCircle, Favorite, FavoriteBorder } from "@mui/icons-material";

const WatchPage = () => {
  const { videoId } = useParams();
  const { data } = useStoreState((s) => s.videos);
  const { items } = useStoreState((s) => s.favorites);
  const { addToFavorite, removeFromFavorite } = useStoreActions((a) => a.favorites);
  const video = data[videoId];
  const isFav = items.includes(videoId);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  if (!video) {
    return (
      <Container maxWidth="md" sx={{ pt: 12, textAlign: "center", color: "#fff" }}>
        <Box sx={{ py: 8, borderRadius: "16px", border: "1px solid #27272A", bgcolor: "#111113" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", mb: 1 }}>Video not found</Typography>
          <Typography sx={{ color: "#71717A", mb: 3 }}>It may have been removed from your library.</Typography>
          <Box component={Link} to="/videos" sx={{ display: "inline-flex", alignItems: "center", gap: 0.8, px: 2.5, py: 1, borderRadius: "8px", bgcolor: "#fff", color: "#09090B", fontWeight: 700, textDecoration: "none" }}>
            <ArrowBack sx={{ fontSize: 16 }} /> Back to videos
          </Box>
        </Box>
      </Container>
    );
  }
  const opts = { playerVars: { autoplay: 1 }, width: "100%", height: "100%" };
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#09090B", color: "#fff", pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 4, px: { xs: 2, md: 3 } }}>
        <Box sx={{ borderRadius: { xs: 0, md: "12px" }, overflow: "hidden", bgcolor: "#000", border: { xs: "none", md: "1px solid #27272A" } }}>
          <Box sx={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
            <Box sx={{ position: "absolute", inset: 0 }}><YouTube videoId={videoId} opts={opts} style={{ width: "100%", height: "100%" }} /></Box>
          </Box>
        </Box>
        <Box sx={{ px: { xs: 2, md: 0 }, mt: 2.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 1.2 }}>
            <Chip icon={<SmartDisplay sx={{ fontSize: 14 }} />} label="Single video • Ad-free" size="small" sx={{ bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA", fontWeight: 700, fontSize: "0.7rem", height: 24 }} />
            <Chip icon={<CheckCircle sx={{ fontSize: 12, color: "#22C55E !important" }} />} label="Saved locally" size="small" sx={{ bgcolor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.14)", color: "#22C55E", fontWeight: 700, fontSize: "0.7rem", height: 24 }} />
            <Tooltip title={isFav ? "Remove favorite" : "Add favorite"}>
              <IconButton onClick={() => (isFav ? removeFromFavorite(videoId) : addToFavorite(videoId))} size="small" sx={{ ml: 1, width: 32, height: 32, borderRadius: "8px", bgcolor: isFav ? "#18181B" : "transparent", border: "1px solid", borderColor: isFav ? "#27272A" : "#27272A", color: isFav ? "#DC2626" : "#71717A", "&:hover": { bgcolor: "#18181B" } }}>
                {isFav ? <Favorite sx={{ fontSize: 16 }} /> : <FavoriteBorder sx={{ fontSize: 16 }} />}
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.4rem" }, lineHeight: 1.25 }}>{video.title}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, color: "#71717A", fontSize: "0.84rem" }}>
            <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", fontSize: "0.65rem", fontWeight: 800, color: "#A1A1AA" }}>{video.channelTitle?.[0]}</Box>
            {video.channelTitle} • {new Date(video.publishedAt).toLocaleDateString()}
          </Stack>
          {video.description && (
            <Box sx={{ mt: 2, p: 2, borderRadius: "12px", bgcolor: "#111113", border: "1px solid #27272A" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.82rem", mb: 0.8 }}>Description</Typography>
              <Typography sx={{ color: "#A1A1AA", fontSize: "0.84rem", lineHeight: 1.6, whiteSpace: "pre-wrap", display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{video.description.slice(0, 600)}{video.description.length > 600 ? "…" : ""}</Typography>
            </Box>
          )}
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Box component={Link} to="/videos" sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, px: 2.2, py: 1, borderRadius: "8px", bgcolor: "#18181B", border: "1px solid #27272A", color: "#fff", fontWeight: 700, fontSize: "0.84rem", textDecoration: "none" }}><ArrowBack sx={{ fontSize: 16 }} /> Back to videos</Box>
            <Box component="a" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, px: 2.2, py: 1, borderRadius: "8px", bgcolor: "#fff", color: "#09090B", fontWeight: 700, fontSize: "0.84rem", textDecoration: "none" }}>Open on YouTube</Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
export default WatchPage;
