import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import { Box, Grid, TextField, Typography, useMediaQuery, useTheme, InputAdornment, Chip, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useParams, Link } from "react-router-dom";
import { Search, PlayArrow, ArrowBack, Bolt, VideoLibrary } from "@mui/icons-material";
import VideoCardItem from "../../components/video-card-item";
import GoToTopButton from "../../components/shared/go-to-top-button";

const PlayerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { playlistId } = useParams();
  const { data } = useStoreState((state) => state.playlists);
  const current = data[playlistId];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  if (!current) {
    return (
      <Container maxWidth="lg" sx={{ pt: isSmallScreen ? 12 : 14, textAlign: "center" }}>
        <Box sx={{ py: 10, borderRadius: "24px", bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Playlist not found 😕</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}>This playlist may have been removed.</Typography>
          <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2.5, py: 1.1, borderRadius: "999px", bgcolor: "#fff", color: "#111", fontWeight: 700, textDecoration: "none" }}>
            <ArrowBack sx={{ fontSize: 18 }} /> Back to Home
          </Box>
        </Box>
      </Container>
    );
  }

  const videoItemArray = current.playlistItems;
  const filteredPlaylistItem = videoItemArray.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Box sx={{ minHeight: "100vh", pb: "60px", color: "#fff", background: "#09090B", position: "relative" }}>

      <Container maxWidth="xl" sx={{ pt: { xs: 11, md: 10 }, position: "relative", zIndex: 1, px: { xs: 2, md: 3 } }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: { xs: 2.5, lg: 4 }, mb: 4 }}>
          <Box sx={{ flex: { lg: "0 0 360px" }, minWidth: 0 }}>
            <Box
              component={Link}
              to="/"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.8, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600, mb: 1.5, "&:hover": { color: "#fff" } }}
            >
              <ArrowBack sx={{ fontSize: 16 }} /> Back to library
            </Box>

            <Box sx={{ p: 2.5, borderRadius: "12px", bgcolor: "#111113", border: "1px solid #27272A" }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                <Chip label={`${videoItemArray.length} VIDEOS`} size="small" sx={{ bgcolor: "#DC2626", color: "#fff", fontWeight: 700, fontSize: "0.65rem", height: 22, borderRadius: "6px" }} />
                <Chip icon={<Bolt sx={{ fontSize: 12, color: "#A1A1AA !important" }} />} label="AD-FREE" size="small" sx={{ bgcolor: "#18181B", color: "#A1A1AA", fontWeight: 700, fontSize: "0.65rem", height: 22, border: "1px solid #27272A" }} />
              </Stack>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "1.25rem", md: "1.45rem" }, lineHeight: 1.2, mb: 1 }}>
                {current.playlistTitle}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "#71717A", fontSize: "0.82rem", mb: 2 }}>
                <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", fontSize: "0.7rem", fontWeight: 800, color: "#A1A1AA" }}>{current.channelTitle?.[0]}</Box>
                {current.channelTitle} • {videoItemArray.length} lessons
              </Stack>

              <TextField
                fullWidth
                placeholder="Search in this playlist…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <Box onClick={() => setSearchQuery("")} sx={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.6)", cursor: "pointer", px: 1, py: 0.4, borderRadius: "999px", bgcolor: "rgba(255,255,255,0.06)", "&:hover": { color: "#fff" } }}>
                        Clear
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    borderRadius: "10px",
                    height: 40,
                    bgcolor: "#09090B",
                    "& fieldset": { borderColor: "#27272A" },
                    "&:hover fieldset": { borderColor: "#3F3F46" },
                    "&.Mui-focused fieldset": { borderColor: "#DC2626" },
                  },
                  "& input::placeholder": { color: "#71717A", fontSize: "0.88rem" },
                }}
              />
              <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", mt: 1 }}>{filteredPlaylistItem.length} videos • instantly searchable</Typography>
            </Box>
          </Box>

          {/* First 2 featured */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <PlayArrow sx={{ color: "#FF3B30", fontSize: 18 }} />
              <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.04em" }}>FEATURED • START HERE</Typography>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(255,255,255,0.06)", ml: 1 }} />
            </Stack>
            <Grid container spacing={2}>
              {filteredPlaylistItem.slice(0, 2).map((item) => (
                <Grid item xs={12} sm={6} key={item.contentDetails.videoId}>
                  <VideoCardItem
                    title={item.title}
                    thumbnails={item.thumbnails}
                    videoId={item.contentDetails.videoId}
                    videos={filteredPlaylistItem.map((video) => video.contentDetails.videoId)}
                    playlistId={playlistId}
                  />
                </Grid>
              ))}
              {filteredPlaylistItem.slice(0, 2).length === 0 && (
                <Grid item xs={12}>
                  <Box sx={{ py: 4, textAlign: "center", borderRadius: "16px", bgcolor: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)" }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>No featured videos</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>

        {/* REMAINING */}
        {filteredPlaylistItem.length > 2 ? (
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
              <VideoLibrary sx={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }} />
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>All Videos</Typography>
              <Chip label={`${filteredPlaylistItem.length - 2} more`} size="small" sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "0.68rem", height: 22 }} />
              <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(255,255,255,0.06)", ml: 1 }} />
            </Stack>
            <Grid container spacing={2.5}>
              {filteredPlaylistItem.slice(2).map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.contentDetails.videoId}>
                  <VideoCardItem
                    title={item.title}
                    thumbnails={item.thumbnails}
                    videoId={item.contentDetails.videoId}
                    videos={filteredPlaylistItem.map((video) => video.contentDetails.videoId)}
                    playlistId={playlistId}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {filteredPlaylistItem.length === 0 && (
          <Box textAlign="center" py={10} sx={{ borderRadius: "20px", bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", mt: 2 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: "16px", bgcolor: "rgba(255,255,255,0.04)", display: "grid", placeItems: "center", mx: "auto", mb: 1.5 }}>
              <Search sx={{ color: "rgba(255,255,255,0.35)" }} />
            </Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 800 }}>
              No matching videos found
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Try a different keyword — e.g. “introduction” or “part 1”
            </Typography>
          </Box>
        )}
      </Container>
      <GoToTopButton />
    </Box>
  );
};

export default PlayerPage;
