import { useStoreState } from "easy-peasy";
import { Container } from "@mui/system";
import { Box, Grid, Typography, Stack, Chip } from "@mui/material";
import { History, Schedule, ArrowBack, PlayArrow } from "@mui/icons-material";
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
    <Box sx={{ minHeight: "100vh", background: "#07080B", color: "#fff", position: "relative" }}>
      <Box sx={{ position: "absolute", inset: 0, background: `radial-gradient(600px 600px at 20% 20%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(600px 600px at 80% 0%, rgba(139,92,246,0.07), transparent 60%)`, pointerEvents: "none" }} />
      <Container maxWidth="xl" sx={{ pt: 12, pb: 8, position: "relative", zIndex: 1, px: { xs: 2, md: 3 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: "12px", bgcolor: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.18)", display: "grid", placeItems: "center" }}>
                <History sx={{ color: "#3B82F6", fontSize: 20 }} />
              </Box>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.9rem" }, letterSpacing: "-0.02em" }}>Recents</Typography>
              <Chip label={`${itemArray.length}`} sx={{ bgcolor: "#3B82F6", color: "#fff", fontWeight: 800, height: 24, minWidth: 28 }} />
            </Box>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Continue where you left off — your last watched playlists.</Typography>
          </Box>
          {itemArray.length > 0 && (
            <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2.2, py: 1, borderRadius: "999px", bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem" }}>
              <ArrowBack sx={{ fontSize: 16 }} /> Browse all
            </Box>
          )}
        </Stack>

        {itemArray.length > 0 ? (
          <>
            <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1, color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em" }}>
              <Schedule sx={{ fontSize: 14 }} /> LAST VIEWED FIRST
              <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(255,255,255,0.06)", ml: 1 }} />
            </Box>
            <Grid container spacing={2.5}>
              {itemArray.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.playlistId}>
                  <PlaylistCardItem
                    playlistId={item.playlistId}
                    playlistThumbnail={item.playlistItems[0]?.thumbnails}
                    playlistTitle={item.playlistTitle}
                    channelTitle={item.channelTitle}
                    playlistItems={item.playlistItems}
                    path="recents"
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: { xs: 6, md: 10 }, px: 3, textAlign: "center", borderRadius: "24px", border: "1px dashed rgba(255,255,255,0.08)", bgcolor: "rgba(255,255,255,0.015)" }}>
            <Box sx={{ width: 80, height: 80, borderRadius: "20px", bgcolor: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.14)", display: "grid", placeItems: "center", mb: 2.5 }}>
              <PlayArrow sx={{ fontSize: 36, color: "rgba(59,130,246,0.6)" }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: "1.35rem", mb: 1 }}>Nothing watched yet</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 420, lineHeight: 1.6, mb: 3, fontSize: "0.9rem" }}>
              Start watching a playlist and it will appear here. Pick up instantly next time.
            </Typography>
            <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 3, py: 1.3, borderRadius: "999px", background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff", fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 24px rgba(59,130,246,0.3)" }}>
              Start Watching
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Recents;
