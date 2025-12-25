import { useEffect } from "react";
import { useStoreState } from "easy-peasy";
import YouTube from "react-youtube";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import CustomIconButton from "../shared/custom-icon-button";

const VideoPlayer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data } = useStoreState((state) => state.playlists);
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get("videoId");
  const playlistId = location.pathname.split("/")[2];
  const index = location.pathname.split("/")[3];
  const playlistItems = data[playlistId]?.playlistItems || [];
  const lastItem = playlistItems.length - 1;

  const prevIndex = parseInt(index) - 1;
  const prevItem = playlistItems[prevIndex];
  const prevVideoId = prevItem ? prevItem.contentDetails.videoId : "";

  const nextIndex = parseInt(index) + 1;
  const nextItem = playlistItems[nextIndex];
  const nextVideoId = nextItem ? nextItem.contentDetails.videoId : "";

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const opts = {
    playerVars: {
      autoplay: 1,
      fullscreen: 1,
    },
    height: "100%",
    width: "100%",
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
        pt: 13,
        pb: 11,
      }}
    >
      <Container maxWidth="lg">
        {/* ================= VIDEO PLAYER CARD ================= */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: theme.shadows[5],
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

        {/* ================= TITLE + BUTTONS GRID ================= */}
        <Grid
          container
          mt={1}
          spacing={2}
          direction={isSmallScreen ? "column" : "row"}
          alignItems={isSmallScreen ? "flex-start" : "center"}
        >
          {/* Title takes 2/3 on large screens */}
          <Grid item xs={12} md={8}>
            <Box>
              <Typography
                variant={isSmallScreen ? "h6" : "h5"}
                fontWeight={600}
              >
                {playlistItems[index]?.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {playlistItems.length} videos in this playlist
              </Typography>
            </Box>
          </Grid>

          {/* Buttons take 1/3 on large screens */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: isSmallScreen ? "flex-start" : "flex-end",
              gap: 1,
              flexWrap: "wrap",
              mt: isSmallScreen ? 2 : 0,
            }}
          >
            {/* Previous */}
            <CustomIconButton
              to={`/player/${playlistId}/${prevIndex}?videoId=${prevVideoId}`}
              disabled={parseInt(index) === 0}
              icon={ArrowBack}
              isSmallScreen={isSmallScreen}
              title="Previous Video"
            />

            {/* Go Back / Close CTA */}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Close />}
              onClick={() => navigate(`/player/${playlistId}`)}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "#df1923ff",
                "&:hover": { bgcolor: "#bd0b1aff" },
              }}
            >
              Close
            </Button>

            {/* Next */}
            <CustomIconButton
              to={`/player/${playlistId}/${nextIndex}?videoId=${nextVideoId}`}
              disabled={parseInt(index) === lastItem}
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
