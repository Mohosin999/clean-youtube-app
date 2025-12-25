import { useState } from "react";
import PropTypes from "prop-types";
import { List, Drawer, IconButton } from "@mui/material";
import { Home, Favorite, AllOut, Add } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CustomButton from "../custom-button";
import { useNavigate, useLocation } from "react-router-dom";

const DrawerComp = ({ handleClickOpen }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // current route

  const buttons = [
    { text: "Home", icon: Home, path: "/" },
    { text: "Favorites", icon: Favorite, path: "/favorites" },
    { text: "Recents", icon: AllOut, path: "/recents" },
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
            width: 250,
            background: "linear-gradient(90deg, #141E30, #243B55)",
            color: "#fff",
            padding: 2,
          },
        }}
      >
        <List>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginTop: 24,
            }}
          >
            {buttons.map(({ text, icon, path }) => (
              <CustomButton
                key={text}
                icon={icon}
                text={text}
                onClick={() => handleButtonClick(path)}
                variant={location.pathname === path ? "outline" : "ghost"}
              />
            ))}
            <CustomButton
              icon={Add}
              text="Add Playlist"
              variant="primary"
              onClick={() => {
                handleClickOpen();
                setOpenDrawer(false);
              }}
            />
          </div>
        </List>
      </Drawer>

      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: "#efefef" }} />
      </IconButton>
    </>
  );
};

DrawerComp.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
};

export default DrawerComp;
