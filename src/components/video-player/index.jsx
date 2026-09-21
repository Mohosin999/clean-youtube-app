import { useEffect } from "react";
import { useStoreState } from "easy-peasy";
import YouTube from "react-youtube";
import { useLocation, Link } from "react-router-dom";
import { Container, Box, useMediaQuery, useTheme, Typography, Stack, Chip } from "@mui/material";
import { ArrowBack, ArrowForward, Close, PlaylistPlay, CheckCircle } from "@mui/icons-material";

const VideoPlayer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => { window.scrollTo(0, 0); }, []);
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
  const progress = playlistItems.length ? ((index + 1) / playlistItems.length) * 100 : 0;

  const opts = { playerVars: { autoplay: 1, fullscreen: 1 }, width: "100%", height: "100%" };
  const onPlayerReady = (event) => event.target.playVideo();

  const NavButton = ({ to, disabled, icon: Icon, label, primary, danger }) => (
    <Box
      component={disabled ? "div" : Link}
      to={disabled ? undefined : to}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.8,
        px: { xs: 1.4, md: 2.2 },
        py: 1.1,
        borderRadius: "999px",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: { xs: "0.78rem", md: "0.85rem" },
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        pointerEvents: disabled ? "none" : "auto",
        transition: "all 0.2s",
        bgcolor: danger ? "#DC2626" : primary ? "#fff" : "#18181B",
        color: danger ? "#fff" : primary ? "#09090B" : "#fff",
        border: "1px solid",
        borderColor: danger ? "#DC2626" : primary ? "#fff" : "#27272A",
        "&:hover": { transform: disabled ? "none" : "translateY(-1px)", bgcolor: danger ? "#B91C1C" : primary ? "#E4E4E7" : "#27272A" },
      }}
    >
      <Icon sx={{ fontSize: 18 }} /> <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>{label}</Box><Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>{label.split(" ")[0]}</Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#09090B", color: "#fff", pb: 6 }}>
      {/* Progress bar */}
      <Box sx={{ position: "fixed", top: { xs: 56, md: 64 }, left: 0, right: 0, height: 2, bgcolor: "#27272A", zIndex: 10 }}>
        <Box sx={{ height: "100%", width: `${progress}%`, bgcolor: "#DC2626", transition: "width 0.4s ease" }} />
      </Box>

      <Container maxWidth="xl" sx={{ pt: 4, px: { xs: 2, md: 3 } }}>
        {/* Player */}
        <Box
          sx={{
            borderRadius: { xs: 0, md: "12px" },
            overflow: "hidden",
            bgcolor: "#000",
            border: { xs: "none", md: "1px solid #27272A" },
            position: "relative",
          }}
        >
          <Box sx={{ position: "relative", width: "100%", pt: isSmallScreen ? "56.25%" : "52%" }}>
            <Box sx={{ position: "absolute", inset: 0 }}>
              <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} style={{ width: "100%", height: "100%" }} />
            </Box>
          </Box>
        </Box>

        {/* Info bar */}
        <Box sx={{ px: { xs: 2, md: 0 }, mt: 2.5 }}>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={2} alignItems={{ lg: "flex-start" }} justifyContent="space-between">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 1.2 }}>
                <Chip icon={<PlaylistPlay sx={{ fontSize: 16 }} />} label={`Lesson ${index + 1} of ${playlistItems.length}`} size="small" sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.75)", fontWeight: 700, fontSize: "0.72rem", border: "1px solid rgba(255,255,255,0.08)" }} />
                <Chip icon={<CheckCircle sx={{ fontSize: 14, color: "#22c55e !important" }} />} label={`${Math.round(progress)}% completed`} size="small" sx={{ bgcolor: "rgba(34,197,94,0.10)", color: "#22c55e", fontWeight: 700, fontSize: "0.72rem", border: "1px solid rgba(34,197,94,0.18)" }} />
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.6, color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#FF3B30", boxShadow: "0 0 8px rgba(255,59,48,0.6)" }} /> AD-FREE PLAYBACK
                </Box>
              </Stack>

              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "1.05rem", md: "1.35rem" }, lineHeight: 1.25, mb: 0.7 }}>{playlistItems[index]?.title}</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                {data[playlistId]?.channelTitle} • {playlistItems.length} videos in this playlist
              </Typography>

              {/* mini progress dots */}
              <Box sx={{ display: "flex", gap: 0.6, mt: 1.5, overflowX: "auto", pb: 0.5, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
                {playlistItems.slice(0, 20).map((_, i) => (
                  <Box key={i} sx={{ width: i === index ? 28 : 8, height: 6, borderRadius: "999px", bgcolor: i === index ? "#FF3B30" : i < index ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.10)", flexShrink: 0, transition: "all 0.25s" }} />
                ))}
                {playlistItems.length > 20 && <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", ml: 1, whiteSpace: "nowrap" }}>+{playlistItems.length - 20} more</Typography>}
              </Box>
            </Box>

            <Stack direction="row" spacing={1} sx={{ flexShrink: 0, flexWrap: "nowrap", alignItems: "center" }}>
              <NavButton to={`/player/${playlistId}/${prevIndex}?videoId=${prevVideoId}`} disabled={index === 0} icon={ArrowBack} label="Previous" />
              <NavButton to={`/player/${playlistId}`} icon={Close} label="Close" danger />
              <NavButton to={`/player/${playlistId}/${nextIndex}?videoId=${nextVideoId}`} disabled={index === lastItem} icon={ArrowForward} label="Next" primary />
            </Stack>
          </Stack>

          {/* Up next */}
          {playlistItems.length > 1 && (
            <Box sx={{ mt: 3, p: 2, borderRadius: "16px", bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: "0.85rem" }}>Up Next</Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>Continue your streak</Typography>
                <Box sx={{ flex: 1 }} />
                <Box component={Link} to={`/player/${playlistId}`} sx={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.6)", textDecoration: "none", "&:hover": { color: "#fff" } }}>View all →</Box>
              </Stack>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 1.5 }}>
                {playlistItems.slice(index + 1, index + 4).map((item, i) => {
                  const vIdx = index + 1 + i;
                  return (
                    <Box key={item.contentDetails.videoId} component={Link} to={`/player/${playlistId}/${vIdx}?videoId=${item.contentDetails.videoId}`} sx={{ display: "flex", gap: 1.2, p: 1.2, borderRadius: "12px", bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.05)" } }}>
                      <Box component="img" src={item.thumbnails?.url} alt={item.title} sx={{ width: 96, height: 54, borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.title}</Typography>
                        <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", mt: 0.4 }}>Lesson {vIdx + 1}</Typography>
                      </Box>
                    </Box>
                  );
                })}
                {index === lastItem && <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", py: 2 }}>🎉 You’ve reached the end! Amazing work.</Typography>}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default VideoPlayer;
