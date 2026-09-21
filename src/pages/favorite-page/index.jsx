import { useStoreState, useStoreActions } from "easy-peasy";
import { Container } from "@mui/system";
import { Box, Grid, Typography, Stack, Chip, IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder, ArrowBack, VideoLibrary, SmartDisplay, Delete, PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PlaylistCardItem from "../../components/playlist-card-item";

const VideoFavCard = ({ video }) => {
  const { removeFromFavorite } = useStoreActions((a) => a.favorites);
  return (
    <Box sx={{ borderRadius: "12px", overflow: "hidden", bgcolor: "#111113", border: "1px solid #27272A", height: "100%", display: "flex", flexDirection: "column" }}>
      <Box component={Link} to={`/watch/${video.videoId}`} sx={{ position: "relative", display: "block", paddingTop: "56.25%", overflow: "hidden", bgcolor: "#09090B" }}>
        <Box component="img" src={video.thumbnails?.url} alt={video.title} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <Box sx={{ position: "absolute", top: 8, left: 8, width: 26, height: 26, borderRadius: "50%", bgcolor: "#DC2626", display: "grid", placeItems: "center" }}><Favorite sx={{ fontSize: 14, color: "#fff" }} /></Box>
      </Box>
      <Box sx={{ p: 1.6, flex: 1, display: "flex", flexDirection: "column", gap: 0.8 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.4em" }}>{video.title}</Typography>
        <Typography sx={{ fontSize: "0.78rem", color: "#71717A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{video.channelTitle}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 1.2, mt: "auto", borderTop: "1px solid #18181B" }}>
          <Box component={Link} to={`/watch/${video.videoId}`} sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.6, py: 0.55, borderRadius: "8px", bgcolor: "#fff", color: "#09090B", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none" }}><PlayArrow sx={{ fontSize: 14 }} /> Watch</Box>
          <Tooltip title="Remove favorite"><IconButton onClick={() => removeFromFavorite(video.videoId)} size="small" sx={{ width: 28, height: 28, borderRadius: "8px", bgcolor: "#18181B", border: "1px solid #27272A", color: "#DC2626" }}><Favorite sx={{ fontSize: 14 }} /></IconButton></Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

const Favorites = () => {
  const { data: playlistData } = useStoreState((s) => s.playlists);
  const { data: videoData } = useStoreState((s) => s.videos);
  const { items } = useStoreState((s) => s.favorites);
  const playlistFavs = [];
  const videoFavs = [];
  items.forEach((id) => {
    if (playlistData[id]) playlistFavs.push(playlistData[id]);
    else if (videoData[id]) videoFavs.push(videoData[id]);
  });
  const total = playlistFavs.length + videoFavs.length;
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  return (
    <Box sx={{ minHeight: "100vh", background: "#09090B", color: "#fff" }}>
      <Container maxWidth="xl" sx={{ pt: 4, pb: 8, px: { xs: 2, md: 3 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 0.6 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center" }}><Favorite sx={{ color: "#DC2626", fontSize: 18 }} /></Box>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.7rem" }, letterSpacing: "-0.02em" }}>Favorites</Typography>
              <Chip label={`${total}`} sx={{ bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA", fontWeight: 700, height: 22 }} />
            </Stack>
            <Typography sx={{ color: "#71717A", fontSize: "0.84rem" }}>{playlistFavs.length} playlists • {videoFavs.length} videos • Your hand-picked list</Typography>
          </Box>
          {total > 0 && <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2.2, py: 1, borderRadius: "8px", bgcolor: "#18181B", border: "1px solid #27272A", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "0.84rem" }}><ArrowBack sx={{ fontSize: 16 }} /> Home</Box>}
        </Stack>

        {total > 0 ? (
          <Stack spacing={4}>
            {playlistFavs.length > 0 && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <VideoLibrary sx={{ fontSize: 18, color: "#71717A" }} /><Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>Playlists</Typography><Chip label={`${playlistFavs.length}`} size="small" sx={{ height: 20, fontSize: "0.68rem", bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA" }} />
                </Stack>
                <Grid container spacing={2.5}>
                  {playlistFavs.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.playlistId}>
                      <PlaylistCardItem playlistId={item.playlistId} playlistThumbnail={item.playlistItems[0]?.thumbnails} playlistTitle={item.playlistTitle} channelTitle={item.channelTitle} playlistItems={item.playlistItems} path="favorites" />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {videoFavs.length > 0 && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <SmartDisplay sx={{ fontSize: 18, color: "#71717A" }} /><Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>Videos</Typography><Chip label={`${videoFavs.length}`} size="small" sx={{ height: 20, fontSize: "0.68rem", bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA" }} />
                </Stack>
                <Grid container spacing={2.5}>
                  {videoFavs.map((v) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={v.videoId}><VideoFavCard video={v} /></Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Stack>
        ) : (
          <Box sx={{ textAlign: "center", py: 8, px: 3, borderRadius: "16px", border: "1px solid #27272A", bgcolor: "#111113" }}>
            <Box sx={{ width: 64, height: 64, borderRadius: "16px", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", mx: "auto", mb: 2 }}><FavoriteBorder sx={{ color: "#71717A" }} /></Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.8 }}>No favorites yet</Typography>
            <Typography sx={{ color: "#71717A", fontSize: "0.875rem", maxWidth: 420, mx: "auto", mb: 3, lineHeight: 1.6 }}>Tap the heart on any playlist or video to save it here.</Typography>
            <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 3, py: 1.2, borderRadius: "8px", bgcolor: "#fff", color: "#09090B", fontWeight: 700, textDecoration: "none" }}><VideoLibrary sx={{ fontSize: 16 }} /> Explore</Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
export default Favorites;
