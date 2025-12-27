import { useEffect } from "react";
import { useStoreState } from "easy-peasy";
import YouTube from "react-youtube";
import { useLocation } from "react-router-dom";
import {
  Container,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import CustomIconButton from "../shared/custom-icon-button";

const VideoPlayer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data } = useStoreState((state) => state.playlists);
  const location = useLocation();

  const videoId = new URLSearchParams(location.search).get("videoId");
  const playlistId = location.pathname.split("/")[2];
  const index = parseInt(location.pathname.split("/")[3], 10);

  const playlistItems = data[playlistId]?.playlistItems || [];
  const lastItem = playlistItems.length - 1;

  const prevIndex = index - 1;
  const nextIndex = index + 1;

  const prevVideoId = playlistItems[prevIndex]?.contentDetails?.videoId || "";
  const nextVideoId = playlistItems[nextIndex]?.contentDetails?.videoId || "";

  const opts = {
    playerVars: {
      autoplay: 1,
      fullscreen: 1,
    },
    width: "100%",
    height: "100%",
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0b0b0f",
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,152,0,0.08), transparent 40%),
          radial-gradient(circle at 80% 0%, rgba(30,136,229,0.08), transparent 40%)
        `,
        color: "#fff",
        pt: isSmallScreen ? 9 : 8,
        pb: 10,
      }}
    >
      {/* ================= VIDEO FULL WIDTH ================= */}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            // borderRadius: 3,
            overflow: "hidden",
            // boxShadow: theme.shadows[5],
            backgroundColor: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
          }}
        >
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
            style={{
              width: "100%",
              height: isSmallScreen ? "220px" : "500px",
            }}
          />
        </Box>
      </Box>

      {/* ================= TITLE + BUTTONS ================= */}
      <Container maxWidth="xl">
        <Grid
          container
          mt={isSmallScreen ? 0 : 1}
          spacing={2}
          alignItems="center"
        >
          {/* -------- Title -------- */}
          <Grid item xs={12} md={8}>
            <Typography variant={isSmallScreen ? "h6" : "h5"} fontWeight={600}>
              {playlistItems[index]?.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {playlistItems.length} videos in this playlist
            </Typography>
          </Grid>

          {/* -------- Buttons (Always Right) -------- */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              flexWrap: "nowrap",
            }}
          >
            {/* Previous */}
            <CustomIconButton
              to={`/player/${playlistId}/${prevIndex}?videoId=${prevVideoId}`}
              disabled={index === 0}
              icon={ArrowBack}
              isSmallScreen={isSmallScreen}
              title="Previous Video"
            />

            {/* Close (Middle Red Button) */}
            <CustomIconButton
              to={`/player/${playlistId}`}
              icon={Close}
              isSmallScreen={isSmallScreen}
              title="Close Player"
              additionalStyles={{
                backgroundColor: "#f01717ff",
                "&:hover": { backgroundColor: "#bd0b1a" },
              }}
            />

            {/* Next */}
            <CustomIconButton
              to={`/player/${playlistId}/${nextIndex}?videoId=${nextVideoId}`}
              disabled={index === lastItem}
              icon={ArrowForward}
              isSmallScreen={isSmallScreen}
              title="Next Video"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VideoPlayer;
