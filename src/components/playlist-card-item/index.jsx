import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { PlayArrow, Favorite } from "@mui/icons-material";
import IconButton from "../shared/icon-button";

const PlaylistCardItem = ({ playlistThumbnail, playlistTitle, channelTitle, playlistId, playlistItems, path, onCardClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToRecent } = useStoreActions((a) => a.recents);
  const { items } = useStoreState((s) => s.favorites);
  useEffect(() => { setIsFavorite(items.includes(playlistId)); }, [items, playlistId]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
        bgcolor: "#111113",
        border: "1px solid #27272A",
        transition: "all 0.2s",
        "&:hover": { borderColor: "#3F3F46", "& .thumb-img": { transform: "scale(1.03)" } },
      }}
    >
      <Box
        component={Link}
        to={`/player/${playlistId}`}
        onClick={() => {
          addToRecent(playlistId);
          if (onCardClick) onCardClick();
        }}
        sx={{ position: "relative", display: "block", paddingTop: "56.25%", overflow: "hidden", bgcolor: "#09090B", textDecoration: "none" }}
      >
        <Box component="img" src={playlistThumbnail?.url} alt={playlistTitle} className="thumb-img" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.65) 100%)" }} />
        <Stack direction="row" spacing={1} sx={{ position: "absolute", top: 8, left: 8, right: 8, justifyContent: "space-between" }}>
          <Chip label={`${playlistItems?.length || 0} videos`} size="small" sx={{ bgcolor: "rgba(0,0,0,0.7)", color: "#fff", fontWeight: 700, fontSize: "0.68rem", height: 22, border: "1px solid rgba(255,255,255,0.14)" }} />
          {isFavorite && (
            <Box sx={{ width: 26, height: 26, borderRadius: "50%", bgcolor: "#DC2626", display: "grid", placeItems: "center" }}>
              <Favorite sx={{ fontSize: 14, color: "#fff" }} />
            </Box>
          )}
        </Stack>
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0, bgcolor: "rgba(0,0,0,0.25)", transition: "opacity 0.2s", "&:hover": { opacity: 1 }, "@media(hover:none)": { display: "none" } }}>
          <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: "#fff", display: "grid", placeItems: "center" }}>
            <PlayArrow sx={{ color: "#09090B", fontSize: 22, ml: "2px" }} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 1.8, flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.45em" }}>
          {playlistTitle}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "#71717A", fontSize: "0.78rem" }}>
          <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", fontSize: "0.6rem", fontWeight: 800, color: "#A1A1AA", flexShrink: 0 }}>
            {channelTitle?.[0] || "C"}
          </Box>
          <Typography sx={{ fontSize: "0.78rem", color: "#71717A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{channelTitle}</Typography>
          <Typography sx={{ fontSize: "0.72rem", color: "#52525B", flexShrink: 0 }}>{playlistItems?.length}v</Typography>
        </Stack>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 1.2, mt: "auto", borderTop: "1px solid #18181B" }}>
          <Box
            component={Link}
            to={`/player/${playlistId}`}
            onClick={() => {
              addToRecent(playlistId);
              if (onCardClick) onCardClick();
            }}
            sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, px: 1.6, py: 0.6, borderRadius: "8px", bgcolor: "#fff", color: "#09090B", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none", "&:hover": { bgcolor: "#E4E4E7" } }}
          >
            <PlayArrow sx={{ fontSize: 14 }} /> Watch
          </Box>
          <IconButton id={playlistId} path={path} isFavorite={isFavorite} />
        </Box>
      </Box>
    </Box>
  );
};

PlaylistCardItem.propTypes = {
  playlistThumbnail: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  playlistTitle: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired,
  playlistItems: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
};

export default PlaylistCardItem;
