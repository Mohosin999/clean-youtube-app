// import React, { useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { useMediaQuery } from "@mui/material";
// import Link from "@mui/material/Link";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { Container } from "@mui/system";
// import DrawerComp from "../../components/shared/drawer";
// import PlaylistForm from "../playlist-form";
// import { Add, AllOut, Favorite, Home } from "@mui/icons-material";
// import CustomButton from "../shared/custom-button";

// /**
//  * Navbar component renders the header for the application, adjusting its layout
//  * based on the screen size. On small screens, it shows a drawer for navigation,
//  * while on larger screens, it displays additional buttons for user interactions.
//  */
// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const isSmallScreen = useMediaQuery("(max-width:992px)");

//   /**
//    * Opens the PlaylistForm modal when the "Add Playlist" button is clicked
//    */
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   /**
//    * Closes the PlaylistForm modal
//    */
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="fixed" sx={{ backgroundColor: "#022c43" }}>
//         <Container>
//           <Toolbar sx={{ padding: "0px !important" }}>
//             {isSmallScreen ? (
//               <>
//                 <Link
//                   to="/"
//                   component={RouterLink}
//                   sx={{ textDecoration: "none" }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "#efefef",
//                       userSelect: "none",
//                       letterSpacing: "0.2rem",
//                     }}
//                   >
//                     Clean•YouTube
//                   </Typography>
//                 </Link>
//                 <Box sx={{ flexGrow: 1 }} />
//                 <DrawerComp handleClickOpen={handleClickOpen} />
//                 <PlaylistForm open={open} handleClose={handleClose} />
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/"
//                   component={RouterLink}
//                   sx={{
//                     textDecoration: "none",
//                     "&:hover": {
//                       transform: "scale(1.1)",
//                       transition: "transform 0.3s ease-in-out",
//                     },
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "#efefef",
//                       userSelect: "none",
//                       letterSpacing: "0.2rem",
//                     }}
//                   >
//                     Clean•YouTube
//                   </Typography>
//                 </Link>
//                 <Box sx={{ flexGrow: 1 }} />
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   {/* Home Button */}
//                   <CustomButton
//                     to="/"
//                     component={RouterLink}
//                     icon={Home}
//                     text="Home"
//                   />
//                   {/* Favorite Button */}
//                   <CustomButton
//                     to="/favorites"
//                     component={RouterLink}
//                     icon={Favorite}
//                     text="Favorites"
//                   />
//                   {/* Recent Button */}
//                   <CustomButton
//                     to="/recents"
//                     component={RouterLink}
//                     icon={AllOut}
//                     text="Recents"
//                   />
//                   {/* Action Button Named `Add Playlist` */}
//                   <CustomButton
//                     icon={Add}
//                     text="Add Playlist"
//                     onClick={handleClickOpen}
//                   />

//                   <PlaylistForm open={open} handleClose={handleClose} />
//                 </Box>
//               </>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </Box>
//   );
// };

// export default Navbar;

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
