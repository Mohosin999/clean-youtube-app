import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import { Box, Grid, Typography} from "@mui/material";
import { Container } from "@mui/system";
import { Search, Add, VideoLibrary } from "@mui/icons-material";
import PlaylistCardItem from "../../components/playlist-card-item";
import CustomButton from "../../components/shared/custom-button";
import PlaylistForm from "../../components/playlist-form";
import GoToTopButton from "../../components/shared/go-to-top-button";

const PlaylistsPage = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = useStoreState((s) => s.playlists);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  let list = Object.values(data);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter((p) => p.playlistTitle.toLowerCase().includes(q) || p.channelTitle.toLowerCase().includes(q));
  }
  const handleCardClick = () => { setLoading(true); setTimeout(() => setLoading(false), 400); };

  return (
    <Box sx={{ bgcolor: "#09090B", color: "#fff", minHeight: "100vh" }}>
      

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, py: 4 }}>
        {list.length > 0 ? (
          <Grid container spacing={2.5}>
            {list.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.playlistId}>
                <PlaylistCardItem playlistId={item.playlistId} playlistThumbnail={item.playlistItems[0]?.thumbnails} playlistTitle={item.playlistTitle} channelTitle={item.channelTitle} playlistItems={item.playlistItems} path="home" onCardClick={handleCardClick} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 8, px: 3, borderRadius: "16px", border: "1px solid #27272A", bgcolor: "#111113" }}>
            <Box sx={{ width: 64, height: 64, borderRadius: "16px", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", mx: "auto", mb: 2 }}>
              {query ? <Search sx={{ color: "#71717A" }} /> : <VideoLibrary sx={{ color: "#71717A" }} />}
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.8 }}>{query ? `No results for "${query}"` : "No playlists yet"}</Typography>
            <Typography sx={{ color: "#71717A", fontSize: "0.875rem", maxWidth: 420, mx: "auto", mb: 3, lineHeight: 1.6 }}>{query ? "Try a different search term." : "Add your first YouTube playlist. Paste any playlist URL or ID and start watching ad-free."}</Typography>
            {!query && Object.keys(data).length === 0 && <CustomButton icon={Add} text="Add Your First Playlist" onClick={() => setOpen(true)} />}
            {query && <CustomButton text="Clear search" variant="ghost" onClick={() => setQuery("")} sx={{ mt: 1 }} />}
          </Box>
        )}
      </Container>

      <PlaylistForm open={open} handleClose={() => setOpen(false)} />
      <GoToTopButton />
      {loading && (
        <Box sx={{ position: "fixed", inset: 0, bgcolor: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", display: "grid", placeItems: "center", zIndex: 2000 }}>
          <Box sx={{ bgcolor: "#18181B", border: "1px solid #27272A", borderRadius: "12px", px: 3, py: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ width: 18, height: 18, border: "2px solid #27272A", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>Opening playlist…</Typography>
          </Box>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </Box>
      )}
    </Box>
  );
};
export default PlaylistsPage;
