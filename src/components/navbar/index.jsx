import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Container, useMediaQuery, Stack } from "@mui/material";
import { Add, Home, Favorite, History, VideoLibrary, SmartDisplay } from "@mui/icons-material";
import DrawerComp from "../../components/shared/drawer";
import PlaylistForm from "../playlist-form";
import CustomButton from "../shared/custom-button";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Playlists", icon: VideoLibrary, path: "/playlists" },
  { label: "Videos", icon: SmartDisplay, path: "/videos" },
  { label: "Favorites", icon: Favorite, path: "/favorites" },
  { label: "Recents", icon: History, path: "/recents" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:1100px)");
  const location = useLocation();
  const isActive = (path) => {
    if (path === "/playlists" && location.pathname.startsWith("/player")) return true;
    if (path === "/videos" && location.pathname.startsWith("/watch")) return true;
    return location.pathname === path;
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(9,9,11,0.85)",
          backdropFilter: "saturate(180%) blur(16px)",
          borderBottom: "1px solid #27272A",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 }, gap: 1.5 }}>
            <Box component={RouterLink} to="/" sx={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 1.2, flexShrink: 0 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: "#DC2626", display: "grid", placeItems: "center" }}>
                <Box sx={{ width: 0, height: 0, borderLeft: "8px solid white", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", ml: "2px" }} />
              </Box>
              <Typography sx={{ color: "#fff", fontFamily: "'Outfit',sans-serif", fontWeight: 800, letterSpacing: "-0.02em", fontSize: "1.05rem", lineHeight: 1 }}>
                Clean YouTube
              </Typography>
              <Box sx={{ display: { xs: "none", lg: "block" }, ml: 0.5, px: 1, py: 0.2, borderRadius: "6px", bgcolor: "#18181B", border: "1px solid #27272A" }}>
                <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", color: "#71717A" }}>FOCUS</Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {isSmallScreen ? (
              <>
                <CustomButton icon={Add} text="Add" variant="primary" onClick={() => setOpen(true)} sx={{ minWidth: 0, px: 1.6, py: 0.8, fontSize: "0.82rem", borderRadius: "8px" }} />
                <DrawerComp handleClickOpen={() => setOpen(true)} />
                <PlaylistForm open={open} handleClose={() => setOpen(false)} />
              </>
            ) : (
              <>
                <Stack direction="row" spacing={0.3} mr={1.2}>
                  {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <Box
                        key={item.path}
                        component={RouterLink}
                        to={item.path}
                        sx={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.6,
                          px: 1.3,
                          py: 0.7,
                          borderRadius: "8px",
                          fontSize: "0.82rem",
                          fontWeight: active ? 700 : 500,
                          color: active ? "#fff" : "#A1A1AA",
                          bgcolor: active ? "#18181B" : "transparent",
                          border: "1px solid",
                          borderColor: active ? "#27272A" : "transparent",
                          transition: "all 0.15s",
                          "&:hover": { color: "#fff", bgcolor: "#18181B" },
                        }}
                      >
                        <item.icon sx={{ fontSize: 15 }} />
                        {item.label}
                      </Box>
                    );
                  })}
                </Stack>
                <CustomButton icon={Add} text="Add" variant="primary" onClick={() => setOpen(true)} sx={{ borderRadius: "8px", px: 2 }} />
                <PlaylistForm open={open} handleClose={() => setOpen(false)} />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar sx={{ minHeight: { xs: 56, md: 64 } }} />
    </>
  );
};

export default Navbar;
