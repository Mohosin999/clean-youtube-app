import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Box, Grid, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import { Add, Delete, PlayArrow, AccessTime, SmartDisplay, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CustomButton from "../../components/shared/custom-button";
import PlaylistForm from "../../components/playlist-form";
import GoToTopButton from "../../components/shared/go-to-top-button";

const VideoCard = ({ video, onDelete }) => {
  const { items } = useStoreState((s) => s.favorites);
  const { addToFavorite, removeFromFavorite } = useStoreActions((a) => a.favorites);
  const isFav = items.includes(video.videoId);
  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) removeFromFavorite(video.videoId);
    else addToFavorite(video.videoId);
  };

  return (
    <Box sx={{ borderRadius: "12px", overflow: "hidden", bgcolor: "#111113", border: "1px solid #27272A", height: "100%", display: "flex", flexDirection: "column", "&:hover": { borderColor: "#3F3F46" }, transition: "border-color 0.2s" }}>
      <Box component={Link} to={`/watch/${video.videoId}`} sx={{ position: "relative", display: "block", paddingTop: "56.25%", overflow: "hidden", bgcolor: "#09090B" }}>
        <Box component="img" src={video.thumbnails?.url} alt={video.title} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <Box sx={{ position: "absolute", bottom: 8, right: 8, px: 0.7, py: 0.2, borderRadius: "6px", bgcolor: "rgba(0,0,0,0.75)", color: "#fff", fontSize: "0.62rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.4 }}>
          <AccessTime sx={{ fontSize: 10 }} /> {video.contentDetails?.duration?.replace("PT", "").toLowerCase() || "video"}
        </Box>
        {isFav && (
          <Box sx={{ position: "absolute", top: 8, left: 8, width: 26, height: 26, borderRadius: "50%", bgcolor: "#DC2626", display: "grid", placeItems: "center" }}>
            <Favorite sx={{ fontSize: 14, color: "#fff" }} />
          </Box>
        )}
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0, bgcolor: "rgba(0,0,0,0.22)", transition: "opacity 0.2s", "&:hover": { opacity: 1 }, "@media(hover:none)": { display: "none" } }}>
          <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: "#fff", display: "grid", placeItems: "center" }}><PlayArrow sx={{ color: "#09090B", fontSize: 22, ml: "2px" }} /></Box>
        </Box>
      </Box>
      <Box sx={{ p: 1.6, flex: 1, display: "flex", flexDirection: "column", gap: 0.8 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.4em" }}>{video.title}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "#71717A", fontSize: "0.78rem" }}>
          <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", fontSize: "0.6rem", fontWeight: 800, color: "#A1A1AA", flexShrink: 0 }}>{video.channelTitle?.[0] || "C"}</Box>
          <Typography sx={{ fontSize: "0.78rem", color: "#71717A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{video.channelTitle}</Typography>
        </Stack>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 1.2, mt: "auto", borderTop: "1px solid #18181B" }}>
          <Box component={Link} to={`/watch/${video.videoId}`} sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.6, py: 0.55, borderRadius: "8px", bgcolor: "#fff", color: "#09090B", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none", "&:hover": { bgcolor: "#E4E4E7" } }}><PlayArrow sx={{ fontSize: 14 }} /> Watch</Box>
          <Stack direction="row" spacing={0.4} alignItems="center">
            <Tooltip title={isFav ? "Remove favorite" : "Add favorite"}>
              <IconButton onClick={toggleFav} size="small" sx={{ width: 28, height: 28, borderRadius: "8px", bgcolor: isFav ? "#18181B" : "transparent", border: "1px solid", borderColor: isFav ? "#27272A" : "transparent", color: isFav ? "#DC2626" : "#71717A", "&:hover": { bgcolor: "#18181B", color: isFav ? "#DC2626" : "#FAFAFA" } }}>
                {isFav ? <Favorite sx={{ fontSize: 14 }} /> : <FavoriteBorder sx={{ fontSize: 14 }} />}
              </IconButton>
            </Tooltip>
            <Box onClick={() => { onDelete(video.videoId); }} sx={{ width: 28, height: 28, borderRadius: "8px", display: "grid", placeItems: "center", color: "#71717A", cursor: "pointer", "&:hover": { bgcolor: "#18181B", color: "#F87171" } }}><Delete sx={{ fontSize: 14 }} /></Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

const VideosPage = () => {
  const [open, setOpen] = useState(false);
  const { data } = useStoreState((s) => s.videos);
  const { removeVideo } = useStoreActions((a) => a.videos);
  const { removeFromFavorite } = useStoreActions((a) => a.favorites);
  const list = Object.values(data);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  const handleDelete = (id) => { removeVideo(id); removeFromFavorite(id); };

  return (
    <Box sx={{ bgcolor: "#09090B", color: "#fff", minHeight: "100vh" }}>
      

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, py: 4 }}>
        {list.length > 0 ? (
          <Grid container spacing={2.5}>
            {list.map((v) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={v.videoId}>
                <VideoCard video={v} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 8, px: 3, borderRadius: "16px", border: "1px solid #27272A", bgcolor: "#111113" }}>
            <Box sx={{ width: 64, height: 64, borderRadius: "16px", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", mx: "auto", mb: 2 }}>
              <SmartDisplay sx={{ color: "#71717A" }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.8 }}>No videos yet</Typography>
            <Typography sx={{ color: "#71717A", fontSize: "0.875rem", maxWidth: 420, mx: "auto", mb: 3, lineHeight: 1.6 }}>Paste any YouTube video link — watch?v=, youtu.be, or shorts — and watch it clean, ad-free.</Typography>
            <CustomButton icon={Add} text="Add Your First Video" onClick={() => setOpen(true)} />
          </Box>
        )}
      </Container>

      <PlaylistForm open={open} handleClose={() => setOpen(false)} />
      <GoToTopButton />
    </Box>
  );
};
export default VideosPage;
