import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import {
  Box,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import VideoCardItem from "../../video-card-item";
import GoToTopButton from "../../shared/go-to-top-button";

const PlayerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { playlistId } = useParams();
  const { data } = useStoreState((state) => state.playlists);
  const current = data[playlistId];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Scroll to top for every visit
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (!current) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          pt: isSmallScreen ? 12 : 14,
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Playlist not found 😕</Typography>
      </Container>
    );
  }

  const videoItemArray = current.playlistItems;

  const filteredPlaylistItem = videoItemArray.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        paddingBottom: "60px",
        color: "#fff",
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,152,0,0.12), transparent 40%),
          radial-gradient(circle at 80% 0%, rgba(30,136,229,0.12), transparent 40%),
          linear-gradient(180deg, #0b0b0f 0%, #0e0e14 100%)
        `,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Optional subtle noise overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/noise.png')",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ pt: isSmallScreen ? 14 : 16, position: "relative", zIndex: 1 }}
      >
        {/* ================= HEADER + SEARCH + 2 VIDEOS ================= */}
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          direction={isSmallScreen ? "column" : "row"}
        >
          {/* LEFT SIDE: Title + Info */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography
                variant={isSmallScreen ? "h5" : "h4"}
                fontWeight={700}
                gutterBottom
              >
                {current.playlistTitle}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.7, mb: 4 }}>
                {videoItemArray.length} videos • Enjoy Ads-free video
              </Typography>

              {/* SEARCH BAR */}
              <Box
                sx={{
                  p: 2.2,
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search videos in this playlist"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#ff9800" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      borderRadius: "999px",
                      height: 46,
                      backgroundColor: "rgba(0,0,0,0.35)",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.12)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ff9800",
                        boxShadow: "0 0 0 2px rgba(255,152,0,0.25)",
                      },
                    },
                    "& input::placeholder": {
                      color: "#aaa",
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* RIGHT SIDE: First 2 videos */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {filteredPlaylistItem.slice(0, 2).map((item) => (
                <Grid item xs={12} sm={6} key={item.contentDetails.videoId}>
                  <VideoCardItem
                    title={item.title}
                    thumbnails={item.thumbnails}
                    videoId={item.contentDetails.videoId}
                    videos={filteredPlaylistItem.map(
                      (video) => video.contentDetails.videoId
                    )}
                    playlistId={playlistId}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* ================= REMAINING VIDEOS ================= */}
        {filteredPlaylistItem.length > 2 ? (
          <Box mt={6}>
            <Grid container spacing={3}>
              {filteredPlaylistItem.slice(2).map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={item.contentDetails.videoId}
                >
                  <VideoCardItem
                    title={item.title}
                    thumbnails={item.thumbnails}
                    videoId={item.contentDetails.videoId}
                    videos={filteredPlaylistItem.map(
                      (video) => video.contentDetails.videoId
                    )}
                    playlistId={playlistId}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {filteredPlaylistItem.length === 0 && (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" gutterBottom>
              No matching videos found 🔍
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Try a different keyword
            </Typography>
          </Box>
        )}
      </Container>

      {/* Go to Top Button */}
      <GoToTopButton />
    </Box>
  );
};

export default PlayerPage;
