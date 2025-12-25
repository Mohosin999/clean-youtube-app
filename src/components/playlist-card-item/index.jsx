import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import IconButton from "../shared/icon-button";

/**
 * PlaylistCardItem component to display a playlist's thumbnail, title, and other details.
 *
 * @param {Object} playlistThumbnail - The thumbnail object of the playlist.
 * @param {string} playlistTitle - The title of the playlist.
 * @param {string} channelTitle - The title of the channel associated with the playlist.
 * @param {string} playlistId - The unique identifier of the playlist.
 * @param {string} path - The path to the playlist for the "favorite" icon.
 * @param {Function} onCardClick - Optional function to handle click events on the card.
 *
 * @returns {JSX.Element} The rendered PlaylistCardItem component.
 */
const PlaylistCardItem = ({
  playlistThumbnail,
  playlistTitle,
  channelTitle,
  playlistId,
  playlistItems,
  path,
  onCardClick, // Add onClick prop
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { addToRecent } = useStoreActions((actions) => actions.recents);
  const { items } = useStoreState((state) => state.favorites);

  // Update `isFavorite` based on `items` and `playlistId`
  useEffect(() => {
    const favoriteExists = items.some((item) => item === playlistId);
    setIsFavorite(favoriteExists);
  }, [items, playlistId]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: 2,
      }}
    >
      <CardMedia
        to={`/player/${playlistId}`}
        component={Link}
        image={playlistThumbnail?.url}
        alt={playlistTitle}
        onClick={() => {
          addToRecent(playlistId);
          if (onCardClick) onCardClick(); // Trigger loader on click
        }}
        sx={{
          paddingTop: "56.25%",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "5%",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />

      <CardContent sx={{ paddingBottom: "0px !important" }}>
        <Typography variant="body1" color="text.primary" sx={{ color: "#fff" }}>
          {`${
            playlistTitle.length > 50
              ? playlistTitle.substr(0, 50) + "..."
              : playlistTitle
          }`}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#B4B2B0" }}
        >
          {channelTitle} - {playlistItems?.length} videos
        </Typography>

        <div style={{ display: "flex", marginTop: "0.4rem" }}>
          <Button
            to={`/player/${playlistId}`}
            component={Link}
            onClick={() => {
              addToRecent(playlistId);
              if (onCardClick) onCardClick(); // Trigger loader on click
            }}
            sx={{
              padding: "6px 12px",
              "&:hover": {
                backgroundColor: "transparent",
                color: "inherit",
              },
            }}
          >
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ color: "#B4B2B0" }}
            >
              View Playlist
            </Typography>
          </Button>

          <div style={{ marginLeft: "auto" }}>
            <IconButton id={playlistId} path={path} isFavorite={isFavorite} />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

// PropTypes validation
PlaylistCardItem.propTypes = {
  playlistThumbnail: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  playlistTitle: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired,
  playlistItems: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
};

export default PlaylistCardItem;
