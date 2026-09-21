import PropTypes from "prop-types";
import { Stack, Tooltip, IconButton as MuiIconButton } from "@mui/material";
import { useStoreActions } from "easy-peasy";
import DeleteWithConfirm from "../delete-confirmation";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const IconButton = ({ id, path, isFavorite }) => {
  const { addToFavorite, removeFromFavorite } = useStoreActions((a) => a.favorites);
  const { removeFromRecent } = useStoreActions((a) => a.recents);
  const { removePlaylist } = useStoreActions((a) => a.playlists);

  const handleFav = () => (isFavorite ? removeFromFavorite(id) : addToFavorite(id));
  const handleDelete = (pid) => {
    removePlaylist(pid);
    removeFromFavorite(pid);
    removeFromRecent(pid);
  };

  const favBtn = (
    <Tooltip title={isFavorite ? "Remove favorite" : "Add favorite"} arrow>
      <MuiIconButton
        onClick={handleFav}
        size="small"
        sx={{
          width: 28,
          height: 28,
          borderRadius: "8px",
          bgcolor: isFavorite ? "#18181B" : "transparent",
          border: "1px solid",
          borderColor: isFavorite ? "#27272A" : "transparent",
          color: isFavorite ? "#DC2626" : "#71717A",
          "&:hover": { bgcolor: "#18181B", color: isFavorite ? "#DC2626" : "#FAFAFA" },
        }}
      >
        {isFavorite ? <Favorite sx={{ fontSize: 14 }} /> : <FavoriteBorder sx={{ fontSize: 14 }} />}
      </MuiIconButton>
    </Tooltip>
  );

  return (
    <>
      {path === "home" && (
        <Stack direction="row" spacing={0.4} alignItems="center">
          {favBtn}
          <DeleteWithConfirm title="Delete playlist" confirmTitle="Delete playlist?" message="This will remove the playlist from your library. You can add it again with the same link." onConfirm={() => handleDelete(id)} />
        </Stack>
      )}
      {path === "favorites" && <Stack direction="row">{favBtn}</Stack>}
      {path === "recents" && null}
    </>
  );
};

IconButton.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.oneOf(["home", "favorites", "recents"]).isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default IconButton;
