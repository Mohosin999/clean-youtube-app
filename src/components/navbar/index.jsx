import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { Add, Home, Favorite, AllOut } from "@mui/icons-material";

import DrawerComp from "../../components/shared/drawer";
import PlaylistForm from "../playlist-form";
import CustomButton from "../shared/custom-button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:992px)");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(10,10,15,0.7)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          {/* LOGO */}
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: 700,
              letterSpacing: "0.15rem",
              fontSize: "1.1rem",
            }}
          >
            Clean•YouTube
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* MOBILE */}
          {isSmallScreen ? (
            <>
              <DrawerComp handleClickOpen={() => setOpen(true)} />
              <PlaylistForm open={open} handleClose={() => setOpen(false)} />
            </>
          ) : (
            <>
              {/* NAV LINKS */}
              <Stack direction="row" spacing={1.2} mr={2}>
                <CustomButton
                  component={RouterLink}
                  to="/"
                  icon={Home}
                  text="Home"
                  variant={isActive("/") ? "outline" : "ghost"}
                />

                <CustomButton
                  component={RouterLink}
                  to="/favorites"
                  icon={Favorite}
                  text="Favorites"
                  variant={isActive("/favorites") ? "outline" : "ghost"}
                />

                <CustomButton
                  component={RouterLink}
                  to="/recents"
                  icon={AllOut}
                  text="Recents"
                  variant={isActive("/recents") ? "outline" : "ghost"}
                />
              </Stack>

              {/* CTA */}
              <CustomButton
                icon={Add}
                text="Add Playlist"
                variant="primary"
                onClick={() => setOpen(true)}
              />

              <PlaylistForm open={open} handleClose={() => setOpen(false)} />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
