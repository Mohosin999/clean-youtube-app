import { useState } from "react";
import PropTypes from "prop-types";
import { List, Drawer, IconButton, Box, Typography } from "@mui/material";
import { Home, Favorite, History, Add, VideoLibrary, SmartDisplay } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CustomButton from "../custom-button";
import { useNavigate, useLocation } from "react-router-dom";

const DrawerComp = ({ handleClickOpen }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { text: "Home", icon: Home, path: "/" },
    { text: "Playlists", icon: VideoLibrary, path: "/playlists" },
    { text: "Videos", icon: SmartDisplay, path: "/videos" },
    { text: "Favorites", icon: Favorite, path: "/favorites" },
    { text: "Recents", icon: History, path: "/recents" },
  ];

  const handleButtonClick = (path) => {
    setOpenDrawer(false);
    if (path) navigate(path);
  };

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        PaperProps={{
          sx: {
            width: 280,
            background: "#09090B",
            color: "#fff",
            borderLeft: "1px solid #27272A",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.2, borderBottom: "1px solid #27272A" }}>
          <Box sx={{ width: 28, height: 28, borderRadius: "8px", bgcolor: "#DC2626", display: "grid", placeItems: "center" }}>
            <Box sx={{ width: 0, height: 0, borderLeft: "7px solid white", borderTop: "4px solid transparent", borderBottom: "4px solid transparent", ml: "2px" }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>Clean YouTube</Typography>
          <Typography sx={{ ml: "auto", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", color: "#71717A", border: "1px solid #27272A", px: 1, py: 0.2, borderRadius: "6px" }}>MENU</Typography>
        </Box>
        <List sx={{ p: 1.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
            {buttons.map(({ text, icon: Icon, path }) => {
              const active = location.pathname === path || (path === "/playlists" && location.pathname.startsWith("/player")) || (path === "/videos" && location.pathname.startsWith("/watch"));
              return (
                <Box
                  key={text}
                  onClick={() => handleButtonClick(path)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    px: 1.5,
                    py: 1.2,
                    borderRadius: "8px",
                    cursor: "pointer",
                    bgcolor: active ? "#18181B" : "transparent",
                    color: active ? "#fff" : "#A1A1AA",
                    border: "1px solid",
                    borderColor: active ? "#27272A" : "transparent",
                    fontWeight: active ? 700 : 500,
                    fontSize: "0.9rem",
                    "&:hover": { bgcolor: "#18181B", color: "#fff" },
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} /> {text}
                </Box>
              );
            })}
            <Box sx={{ mt: 1.5 }}>
              <CustomButton icon={Add} text="Add Playlist or Video" variant="primary" onClick={() => { handleClickOpen(); setOpenDrawer(false); }} sx={{ width: "100%", borderRadius: "8px" }} />
            </Box>
          </Box>
        </List>
        <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid #27272A" }}>
          <Typography sx={{ fontSize: "0.72rem", color: "#52525B", textAlign: "center" }}>Playlists • Videos • No ads • Local only</Typography>
        </Box>
      </Drawer>

      <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ width: 36, height: 36, bgcolor: "#18181B", border: "1px solid #27272A", color: "#fff", borderRadius: "8px", "&:hover": { bgcolor: "#27272A" } }}>
        <MenuIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </>
  );
};

DrawerComp.propTypes = { handleClickOpen: PropTypes.func.isRequired };
export default DrawerComp;
