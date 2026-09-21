import { useStoreState } from "easy-peasy";
import { Container } from "@mui/system";
import { Box, Grid, Typography, Stack, Chip } from "@mui/material";
import { History, ArrowBack, PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PlaylistCardItem from "../../components/playlist-card-item";
import { useEffect } from "react";

const Recents = () => {
  const { data } = useStoreState((state) => state.playlists);
  const { items } = useStoreState((state) => state.recents);
  const itemArray = [];
  items.forEach((item) => data[item] && itemArray.push(data[item]));
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  return (
    <Box sx={{ minHeight: "100vh", background: "#09090B", color: "#fff" }}>
      <Container maxWidth="xl" sx={{ pt: 4, pb: 8, px: { xs: 2, md: 3 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 0.6 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center" }}>
                <History sx={{ color: "#71717A", fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.7rem" }, letterSpacing: "-0.02em" }}>Recents</Typography>
              <Chip label={`${itemArray.length}`} sx={{ bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA", fontWeight: 700, height: 22 }} />
            </Stack>
            <Typography sx={{ color: "#71717A", fontSize: "0.84rem" }}>{itemArray.length} playlists • Your last watched</Typography>
          </Box>
          {itemArray.length > 0 && (
            <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2.2, py: 1, borderRadius: "8px", bgcolor: "#18181B", border: "1px solid #27272A", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "0.84rem" }}>
              <ArrowBack sx={{ fontSize: 16 }} /> Home
            </Box>
          )}
        </Stack>

        {itemArray.length > 0 ? (
          <Grid container spacing={2.5}>
            {itemArray.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.playlistId}>
                <PlaylistCardItem playlistId={item.playlistId} playlistThumbnail={item.playlistItems[0]?.thumbnails} playlistTitle={item.playlistTitle} channelTitle={item.channelTitle} playlistItems={item.playlistItems} path="recents" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 8, px: 3, borderRadius: "16px", border: "1px solid #27272A", bgcolor: "#111113" }}>
            <Box sx={{ width: 64, height: 64, borderRadius: "16px", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", mx: "auto", mb: 2 }}>
              <PlayArrow sx={{ color: "#71717A" }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.8 }}>Nothing watched yet</Typography>
            <Typography sx={{ color: "#71717A", fontSize: "0.875rem", maxWidth: 420, mx: "auto", mb: 3, lineHeight: 1.6 }}>Start watching a playlist and it will appear here. Pick up instantly next time.</Typography>
            <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 3, py: 1.2, borderRadius: "8px", bgcolor: "#fff", color: "#09090B", fontWeight: 700, textDecoration: "none" }}>
              <PlayArrow sx={{ fontSize: 16 }} /> Start Watching
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
export default Recents;
