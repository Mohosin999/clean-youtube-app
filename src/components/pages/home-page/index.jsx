import { useRef, useState } from "react";
import { useStoreState } from "easy-peasy";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Divider,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Container } from "@mui/system";
import { Add, PlayCircleFilled, TrendingUp } from "@mui/icons-material";

import PlaylistCardItem from "../../playlist-card-item";
import GoToTopButton from "../../shared/go-to-top-button";
import CustomButton from "../../shared/custom-button";
import PlaylistForm from "../../playlist-form";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const playlistRef = useRef(null);

  const { data } = useStoreState((state) => state.playlists);
  const playlistArray = Object.values(data);

  // Media Queries
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCardClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const handleScroll = () => {
    playlistRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box sx={{ bgcolor: "#0b0b0f", color: "#fff" }}>
      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          minHeight: {
            xs: "auto",
            lg: "100vh",
          },
          pt: {
            xs: "130px",
            lg: "100px",
          },
          pb: {
            xs: 8,
            lg: 10,
          },
          display: "flex",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          background:
            "linear-gradient(135deg, rgba(255,140,0,0.15), rgba(0,0,0,0.9))",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            alignItems="center"
            spacing={{
              xs: 4,
              md: 6,
              lg: 4, // 🔑 reduce spacing on lg
            }}
          >
            {/* TEXT */}
            <Grid
              item
              xs={12}
              md={6}
              lg={7} // 🔑 more space for text on large
            >
              <Chip label="Your Learning Hub" color="warning" sx={{ mb: 2 }} />

              <Typography
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.4rem",
                    md: "3rem",
                    lg: "2.8rem", // 🔑 slightly smaller on lg
                    xl: "3.2rem",
                  },
                  lineHeight: 1.2,
                }}
              >
                Enjoy YouTube <br /> Playlists Without Ads
              </Typography>

              <Typography
                sx={{
                  opacity: 0.85,
                  maxWidth: {
                    xs: "100%",
                    md: 520,
                    lg: 600, // 🔑 wider text container
                  },
                  mb: 4,
                }}
              >
                Save, manage and revisit your favorite playlists in one clean,
                distraction-free place.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <CustomButton
                  icon={Add}
                  text="Add Playlist"
                  onClick={() => setOpen(true)}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                />
                <CustomButton
                  icon={PlayCircleFilled}
                  text="Explore Playlists"
                  variant="outline"
                  onClick={handleScroll}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                />
              </Stack>
            </Grid>

            {/* IMAGE */}
            <Grid
              item
              xs={12}
              md={6}
              lg={5} // 🔑 smaller image column
            >
              <Box
                component="img"
                src="/youtube.png"
                alt="Hero"
                sx={{
                  width: "100%",
                  maxWidth: {
                    xs: 320,
                    sm: 420,
                    md: 480,
                    lg: 440, // 🔑 shrink on lg
                    xl: 520,
                  },
                  mx: "auto",
                  display: "block",
                  mt: { xs: 4, md: 0 },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= PLAYLIST SECTION ================= */}
      <Container maxWidth="lg" ref={playlistRef} sx={{ py: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Your Playlists
        </Typography>

        <Divider sx={{ mb: 6, borderColor: "rgba(255,255,255,0.1)" }} />

        {playlistArray.length > 0 ? (
          <Grid container spacing={3}>
            {playlistArray.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.playlistId}>
                <PlaylistCardItem
                  playlistId={item.playlistId}
                  playlistThumbnail={item.playlistItems[0]?.thumbnails}
                  playlistTitle={item.playlistTitle}
                  channelTitle={item.channelTitle}
                  playlistItems={item.playlistItems}
                  path="home"
                  onCardClick={handleCardClick}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" gutterBottom>
              No playlists yet 😴
            </Typography>
            <CustomButton
              icon={Add}
              text="Create Your First Playlist"
              onClick={() => setOpen(true)}
            />
          </Box>
        )}
      </Container>

      {/* ================= FEATURES ================= */}
      <Container maxWidth="lg" sx={{ pt: 4, pb: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Why This Platform?
        </Typography>

        <Divider sx={{ mb: 6, borderColor: "rgba(255,255,255,0.1)" }} />

        <Grid container spacing={isSmallScreen ? 2 : 4}>
          {[
            {
              title: "Ads-Free Videos",
              desc: "Watch saved playlists without distractions. No ads, just pure learning focus.",
            },
            {
              title: "Clean & Minimal UI",
              desc: "Zero clutter. Designed to keep your attention on content that matters.",
            },
            {
              title: "Boost Productivity",
              desc: "Perfect for focused learning, revision, and long study sessions.",
            },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(10px)",
                  height: "100%",
                }}
              >
                <TrendingUp color="warning" />
                <Typography variant="h6" mt={2} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.75 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= CTA ================= */}
      <Box
        sx={{
          py: 12,
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(255,165,0,0.15), transparent)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Start Building Your Learning Space Today
        </Typography>
        <Typography sx={{ opacity: 0.8, mb: 4 }}>
          Add playlists and stay focused.
        </Typography>
        <CustomButton
          icon={Add}
          text="Add Playlist Now"
          onClick={() => setOpen(true)}
        />
      </Box>

      {/* ================= LOADER ================= */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <CircularProgress color="warning" />
        </Box>
      )}

      <PlaylistForm open={open} handleClose={() => setOpen(false)} />
      <GoToTopButton />
    </Box>
  );
};

export default HomePage;
